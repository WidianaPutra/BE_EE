export const Logger = ({ IP = null, status, service, detail }) => {
    console.log({
        IP: IP || null,
        status: status,
        service: service,
        detail: detail,
        date: new Date(),
    });
};
