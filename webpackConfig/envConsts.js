//process.env variables for each type should go here

module.exports = type => {
  const variable = {
    dev: {
      "process.env.REACT_APP_ENV": JSON.stringify("DEV"),
      "process.env.BASENAME": JSON.stringify("/"),
      "process.env.BASEURL": JSON.stringify(
        "https://ems-api.dev.pharedata.com/"
      ),
      "process.env.ELASTICNAMESPACE": JSON.stringify("esproxy/"),
      "process.env.MEDIASETSNAMESPACE": JSON.stringify("mediaset/"),
      "process.env.ELASTICINDEX": JSON.stringify("easy-dev-media-server"),
      "process.env.LOGSELASTICINDEX": JSON.stringify(
        "easy-dev-media-server-logs"
      ),
      "process.env.MEDIASETELASTICINDEX": JSON.stringify(
        "easy-dev-media-server-mediaset"
      ),
      "process.env.S3BUCKET": JSON.stringify(
        "https://s3.amazonaws.com/easy-dev-media-server/original/"
      ),
      "process.env.MEDIASERVER": JSON.stringify(
        "https://ems-nginx.dev.pharedata.com/image/EasySA/"
      ),
      "process.env.PRESET": JSON.stringify("height=300&width=300&format=jpg")
    },
    stage: {
      "process.env.REACT_APP_ENV": JSON.stringify("STAGE"),
      "process.env.BASENAME": JSON.stringify("/"),
      "process.env.BASEURL": JSON.stringify(
        "https://ems-api.stage.pharedata.com/"
      ),
      "process.env.ELASTICNAMESPACE": JSON.stringify("esproxy/"),
      "process.env.MEDIASETSNAMESPACE": JSON.stringify("mediaset/"),
      "process.env.ELASTICINDEX": JSON.stringify("easy-stage-media-server"),
      "process.env.MEDIASETELASTICINDEX": JSON.stringify(
        "easy-stage-media-server-mediaset"
      ),
      "process.env.S3BUCKET": JSON.stringify(
        "https://s3.amazonaws.com/easy-stage-media-original/original/"
      ),
      "process.env.MEDIASERVER": JSON.stringify(
        "https://ems-nginx.stage.pharedata.com/image/EasySA/"
      ),
      "process.env.PRESET": JSON.stringify("height=300&width=300&format=jpg")
    },
    prod: {
      "process.env.REACT_APP_ENV": JSON.stringify("PROD"),
      "process.env.BASENAME": JSON.stringify("/"),
      "process.env.BASEURL": JSON.stringify("https://apimedia.easy.com.ar/"),
      "process.env.ELASTICNAMESPACE": JSON.stringify("esproxy/"),
      "process.env.MEDIASETSNAMESPACE": JSON.stringify("mediaset/"),
      "process.env.ELASTICINDEX": JSON.stringify("easyar-prod1-media-server"),
      "process.env.MEDIASETELASTICINDEX": JSON.stringify("easyar-prod1-media-server-mediaset"),
      "process.env.LOGSELASTICINDEX": JSON.stringify("easycl-prod1-media-server-logs"),
      "process.env.S3BUCKET": JSON.stringify("https://s3.amazonaws.com/easyar-prod1-media-original/original/"),
      "process.env.MEDIASERVER": JSON.stringify("https://media.easy.com.ar/is/image/EasyArg/"),
      "process.env.PRESET": JSON.stringify("$Mini$")
    },
    qa: {}
  };

  return variable[type];
};
