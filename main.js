const fs = require('fs');

const loadJson = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const saveJson = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
};

const getNameParts = (name) => {
    return name.toLowerCase().split(' ');
};

const isRelatedEmail = (nameParts, email) => {
    const emailNamePart = email.split('@')[0].toLowerCase();
    return nameParts.some(part => {
        const regex = new RegExp(part.split('').join('.*'), 'i');
        return regex.test(emailNamePart);
    });
};

const main = () => {
    const users = loadJson('users.json');
    const sampleData = loadJson('sample_data.json');

    const recognized = [];
    const recognizedEmails = new Set();
    const notRecognized = [];

    users.forEach(user => {
        const nameParts = getNameParts(user.name);
        const relatedEmails = [];

        sampleData.forEach(emails_data => {
            const emails = [emails_data.email, emails_data.account_email];
            emails.forEach(email => {
                if (email && isRelatedEmail(nameParts, email)) {
                    relatedEmails.push(email);
                    recognizedEmails.add(email);
                }
            });
        });
        recognized.push({
            user_email: user.email,
            related_emails: relatedEmails
        });
        console.log(`${user.name}: ${relatedEmails.length}`)
    });

    sampleData.forEach(emails_data => {
        const emails = [emails_data.email, emails_data.account_email];
        emails.forEach(email => {
            if (email && !recognizedEmails.has(email)) {
                notRecognized.push(email);
            }
        });
    });

    console.log(`Not Recognized: ${notRecognized.length}`)
    const output = {
        recognized: recognized,
        not_recognized: notRecognized
    };

    saveJson(output, 'output.json');
};

main();
