const {getSystemHealth}= require("../services/health.service");

const fetchHealth=(req,res)=>{
   try{
    const healthData=getSystemHealth();
    res.status(200).json({
        success:true,
        message:"System Health Fetched Successfully",
        data:healthData
    });
   }
   catch(error){
    res.status(500).json({
        status:"error",
        "message":"Unable to fetch system health",
        error:error.message
    })

   }
};

module.exports={fetchHealth};
