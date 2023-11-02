const backendService = {
    async saveCredentials(credentials) {
        try {
            const result = await fetch('http://localhost:8086/identity/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving credential data", error);
        }
    },

    async sendVerificationEmail(emailRequest) {
        try {
            const result = await fetch('http://localhost:8086/email/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailRequest)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error whilesending verification email", error);
        }
    },

    async validateCredentials(credentials) {
        try {
            const result = await fetch('http://localhost:8086/identity/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while validating credential data", error);
        }
    },
}

export default backendService;