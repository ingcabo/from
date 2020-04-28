//env variables
export const API_URL = process.env.BASEURL;
export const ELASTIC_NAMESPACE = process.env.ELASTICNAMESPACE;
export const MEDIASETS_NAMESPACE = process.env.MEDIASETSNAMESPACE;
export const MAIN_ELSTIC_INDEX = process.env.ELASTICINDEX;
export const MEDIASETS_ELSTIC_INDEX = process.env.MEDIASETELASTICINDEX;
export const LOGS_ELSTIC_INDEX = process.env.LOGSELASTICINDEX;
export const MEDIA_VIEW_BASEURL = process.env.MEDIASERVER;
export const MEDIA_VIEW_PRESET = process.env.PRESET;

//API composed urls
export const MEDIA_URL = `${API_URL}media/`;
export const UPLOAD_URL = `${MEDIA_URL}upload`;
export const ELASTIC_URL = `${API_URL}${ELASTIC_NAMESPACE}`;
export const MEIDASETS_ACTIONS_URL = `${API_URL}${MEDIASETS_NAMESPACE}`;
export const MAIN_INDEX = `${ELASTIC_URL}${MAIN_ELSTIC_INDEX}`;
export const MEDIA_INDEX = `${ELASTIC_URL}${MEDIASETS_ELSTIC_INDEX}`;
export const LOGS_INDEX = `${ELASTIC_URL}${LOGS_ELSTIC_INDEX}`;

//app constants
export const LOCAL_STORAGE_KEY = `media_server_token`;
export const NEW_FOLDER_REGEX = new RegExp("^[a-zA-Z0-9/?]+$");

//actions
export const AUTHOERIZE_USER = "AUTHOERIZE_USER";
export const REJECT_USER = "REJECT_USER";
export const SIGNED_IN = "SIGNED_IN";
export const SIGNING_ERROR = "SIGNING_ERROR";
export const SIGNING_IN = "SIGNING_IN";
