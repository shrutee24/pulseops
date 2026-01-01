const os=require('os');

const getSystemHealth=()=>{
console.log("System Health Check Invoked");
return{
    uptime: os.uptime(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuLoad: os.loadavg(),
    platform: os.platform()
}

};

module.exports={getSystemHealth};