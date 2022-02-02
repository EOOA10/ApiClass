const VerifyApiHeaderToken = (req, res, next) => {
    const apitoken  = req.get('apitoken');
    if(apitoken)
    {
        if(apitoken === process.env.API_TOKEN)
        {
            return next();
        }
        else
        {
            return sendUnauthorized(res);
        }
    }
    else
    {
        return sendUnauthorized(res);
    }
}

const sendUnauthorized = (res) => {
    return res.status(401).json({"ERROR":"Recurso No Autorizado"});
}

module.exports = { 
    VerifyApiHeaderToken,
    sendUnauthorized 
};