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

    async getCommentsData(commentObject) {
        try {
            const result = await fetch('http://localhost:8086/comments/save-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentObject)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while posting Comments data", error);
        }
    },

    async saveProfile(profile) {
        try {
            const result = await fetch('http://localhost:8086/profile/save-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving profile data", error);
        }
    },

    async getActiveGamesData() {
        try {
            const result = await fetch('http://localhost:8086/games/get-active-games');

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting active games", error);
        }
    },

    async isProfileComplete(email) {
        try {
            const url = 'http://localhost:8086/profile/is-profile-complete/' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while checking profile completion", error);
        }
    },

    async getActiveEventsWrtInterestedGamesData(email) {
        try {
            const url = 'http://localhost:8086/events/get-upcoming-events-interested-games/' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting active events with respect to interested games", error);
        }
    },

    async getEventDetails(eventName) {
        try {
            const url = 'http://localhost:8086/events/get-event/' + eventName;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting event details with name", error);
        }
    },

    async getEventId(eventName) {
        try {
            const url = 'http://localhost:8086/events/get-event-id/' + eventName;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting event id with name", error);
        }
    },

    async saveTeam(team) {
        try {
            const result = await fetch('http://localhost:8086/events/save-team?isCreate=true&isUpdate=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving team data", error);
        }
    },

    async isRegistered(eventId, eventName, email) {
        try {
            const url = 'http://localhost:8086/events/is-registered?eventId=' + eventId + '&eventName=' + eventName + '&email=' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting isRegistered", error);
        }
    },

    async getTeamDetailsForEvent(eventId, eventName, email) {
        try {
            const url = 'http://localhost:8086/events/get-team-details-for-event?eventId=' + eventId + '&eventName=' + eventName + '&email=' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting getTeamDetailsForEvent", error);
        }
    },

    async getTeamWithEventIDAndEmail(eventId, eventName, email) {
        try {
            const url = 'http://localhost:8086/events/get-team-for-event?eventId=' + eventId + '&eventName=' + eventName + '&email=' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting getTeamDetailsForEvent", error);
        }
    },

    async remainingPlayersPerSlotCount(eventId, eventName, email) {
        try {
            const url = 'http://localhost:8086/events/get-remaining-players-per-slot?eventId=' + eventId + '&eventName=' + eventName + '&email=' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting remainingPlayersPerSlotCount", error);
        }
    },

    async getTeamsWithCount(eventId, eventName) {
        try {
            const url = 'http://localhost:8086/events/get-teams-with-count?eventId=' + eventId + '&eventName=' + eventName;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting getTeamsWithCount", error);
        }
    },

    async updateTeam(team) {
        try {
            const result = await fetch('http://localhost:8086/events/save-team?isCreate=false&isUpdate=true', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while updating team data", error);
        }
    },

    async isProfilePresent(email) {
        try {
            const url = 'http://localhost:8086/profile/is-profile-present/' + email;
            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while fetching is profile present", error);
        }
    },

    async getAllUpcomingOrganizerEvents(email) {
        try {
            const url = 'http://localhost:8086/events/get-upcoming-organizer-events/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting active events with respect to interested games", error);
        }
    },

    async findAllLeaderboardCompleteParticipantEvents(email) {
        try {
            const url = 'http://localhost:8086/events/get-completed-events-participant/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting completed events for participant", error);
        }
    },

    async findAllScheduledParticipantEvents(email) {
        try {
            const url = 'http://localhost:8086/events/get-upcoming-events/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting completed events for participant", error);
        }
    },

    async findAllLeaderboardCompleteOrganizerEvents(email) {
        try {
            const url = 'http://localhost:8086/events/get-completed-events-organizer/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting completed events for organizer", error);
        }
    },

    async findAllScheduledeOrganizerEvents(email) {
        try {
            const url = 'http://localhost:8086/events/get-only-active-events-organizer/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting completed events for organizer", error);
        }
    },

    async saveEvent(event) {
        try {
            const result = await fetch('http://localhost:8086/events/save-event?isCreate=true&isUpdate=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving event data", error);
        }
    },

    async generateExcel(eventId) {
        try {
            const url = 'http://localhost:8086/events/create-sheet/' + eventId;
            const response = await fetch(url);
            const blob = await response.blob();

            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'Teams.xlsx';
            downloadLink.click();
        } catch (error) {
            console.log("Error while generating excel", error);
        }
    },

    async saveLeaderboard(leaderboard) {
        try {
            const result = await fetch('http://localhost:8086/events/save-leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leaderboard)
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving leaderboard data", error);
        }
    },

    async saveLeaderboardDocument(file, eventId) {
        try {
            const url = 'http://localhost:8086/events/save-documents/' + eventId;

            const formData = new FormData();
            formData.append('doc', file);

            const result = await fetch(url, {
                method: 'POST',
                body: formData
            });

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while saving leaderboard documents", error);
        }
    },

    async updateTeamStatus(status, teamName) {
        try {
            const url = 'http://localhost:8086/events/update-team-status?teamStatus=' + status + '&teamName=' + teamName;

            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return result.text();
        } catch (error) {
            console.log("Error while updating team status", error);
        }
    },

    async isLeaderboardComplete(eventId) {
        try {
            const url = 'http://localhost:8086/events/is-leaderboard-complete/' + eventId;

            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while is leaderboard complete", error);
        }
    },

    async getTeamsWithPoints(eventId) {
        try {
            const url = 'http://localhost:8086/events/get-teams-with-points/' + eventId;

            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting teams with points", error);
        }
    },

    async getLeaderboard(eventId, email) {
        try {
            const url = 'http://localhost:8086/events/get-leaderboard/' + email + '?eventId=' + eventId;

            const result = await fetch(url);

            const jsonResult = await result.json();

            return jsonResult;
        } catch (error) {
            console.log("Error while getting leaderboard data", error);
        }
    },

    async getVideoDetails(email) {
        try {
            const url = 'http://localhost:8086/youtube/get-news-videos/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting video details", error);
        }
    },

    async getInterestedGamesForUser(email) {
        try {
            const url = 'http://localhost:8086/games/get-interested-games/' + email;
            const result = await fetch(url);
            const jsonResult = await result.json();
            if (!result.ok) {
                throw new Error(jsonResult.message || 'Internal Server Error');
            }
            return jsonResult;
        } catch (error) {
            console.log("Error while getting interested games", error);
        }
    },
}

export default backendService;