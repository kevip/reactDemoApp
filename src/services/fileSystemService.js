const RNFS = require('react-native-fs');
const IMAGES_PATH = 'product-images';

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

export const copyFile = (fileName) => {
    return RNFS.copyFileAssets(`images/${fileName}`,`${RNFS.DocumentDirectoryPath}/${IMAGES_PATH}/${fileName}`);
}

export const listFiles = () => {
    // get a list of files and directories in the main bundle
    RNFS.readdir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
            console.log('GOT RESULT', result);            
            // stat the first file
            //return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        /*.then((statResult) => {
            if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
        })
        .then((contents) => {
            // log the file contents
            console.log(contents);
        })*/
        .catch((err) => {
            console.log(err.message, err.code);
        });
}
