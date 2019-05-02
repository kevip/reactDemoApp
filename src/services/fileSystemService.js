const RNFS = require('react-native-fs');
const IMAGES_PATH = 'images';

export const openFile = () => {

}
/**
 * 
 * @param {*} fileName 
 */
export const createFile = (fileName) => {
    let path = `${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/`;
    return RNFS.exists(path).then( exists => {
        console.log(_);
        if(exists) {
            return RNFS.writeFile(`${path}/${fileName}`, 'something here', 'utf8');
        }
        return RNFS.mkdir(path);
    }).catch(_ => {
        //RNFS.mkdir(path)
    })
}

export const copyFile = (assetFileName, fileName) => {
    return RNFS.existsAssets(`images/${assetFileName}`).
        then( exists => {
            if(exists) {
                return RNFS.exists(`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}`);
            } else {
                throw "assets folder doesn't exists";
            }
        }).
        then(exists => {
            console.log(exists);
            if(exists) {
                return RNFS.copyFileAssets(`${IMAGES_PATH}/${assetFileName}`,`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${fileName}`);
            } else {
                return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}`).
                    then( _=> {
                        console.log("creating directory...");
                        return RNFS.copyFileAssets(`${IMAGES_PATH}/${assetFileName}`,`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${fileName}`);
                    })
            }
        }).
        catch( error => {
            console.log(error);
        });
    // return RNFS.copyFileAssets(`/images/${fileName}`,`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${fileName}`);
}

export const readFile = (fileName) => {
    // get a list of files and directories in the main bundle
    RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${fileName}`, 'base64').
        then( _ => {
            console.log(_);
        }).
        catch(error => {
            console.log(error);
        });    
}
