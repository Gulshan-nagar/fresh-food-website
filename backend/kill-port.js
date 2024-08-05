const exec = require('child_process').exec;

const PORT = process.env.PORT || 5000;

exec(`netstat -ano | findstr :${PORT}`, (err, stdout, stderr) => {
    if (err) {
        console.error(`Error finding port ${PORT}: ${stderr}`);
        return;
    }

    const lines = stdout.trim().split('\n');
    lines.forEach((line) => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[4]; // PID is the last column
        if (pid) {
            exec(`taskkill /PID ${pid} /F`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Error killing process ${pid}: ${stderr}`);
                } else {
                    console.log(`Killed process ${pid} on port ${PORT}`);
                }
            });
        }
    });
});
