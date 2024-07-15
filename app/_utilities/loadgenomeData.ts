import * as tf from '@tensorflow/tfjs';

type ModelType = {
    data:any[]
}

function argmax(arr:number[]) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

async function GenomeModel(data:ModelType): Promise<any> {

    ///const ModelURL = 'http://localhost:3000/model/model.json';
    const ModelURL = 'https://health-weather-app-web.vercel.app/model/model.json';
    const compositionModel = await tf.loadLayersModel(ModelURL);
    const ardata = tf.tensor2d(data.data)
    const localdata = (compositionModel.predict(ardata) as tf.Tensor)
    const forecasteddata = localdata.arraySync() as any

    const localdecoded = []

    for (let i=0; i< 30000; i++) {
        const currentmax = argmax(forecasteddata[0][i]) 
        localdecoded.push( currentmax )
        }
    
    return localdecoded;
}

export { GenomeModel }