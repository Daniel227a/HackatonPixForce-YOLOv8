import React, { useContext, useState, useRef  } from "react";
import { StyleSheet, Text, View} from 'react-native';
import {Camera} from 'react-native-pytorch-core';
import classifyImage from '../components/ImageClassifier';
import { DownloadContext } from "../contexts/DownloadContexts";
import PerformanceStats from "react-native-performance-stats";

const DEV_WITH_UI_UPDATES = true;

export default () => {
    const [topClass, setTopClass] = React.useState(
        "Pressione o botão para classificar",
    );
    
    const { download } = useContext(DownloadContext)
    
    const [stats, setStats] = useState("");
    const statsUpdatedCallback = (stats) => {
        const statsStr = `mem: ${stats.usedRam.toFixed(2)}MB, CPU: ${stats.usedCpu.toFixed(2)}%\n`;
        if (DEV_WITH_UI_UPDATES){
          setStats((prev) => {
            return prev + statsStr;
          });
        } else {
          console.log(statsStr);
        }
        console.log(stats)
    }

    let prevListenerRef = useRef();
    const onPressStopListener = () => {
        prevListenerRef.current?.remove();
        PerformanceStats.stop();
        prevListenerRef.current = null;
        setStats("");
    }

    const onPressStartListener = () => {
        onPressStopListener();

        prevListenerRef.current = PerformanceStats.addListener(statsUpdatedCallback);
        PerformanceStats.start(true);
    }

    async function handleImage(image) {
        const result = await classifyImage(image, download);
        setTopClass(result);
        image.release();
    }

    async function start(image) {
        console.log('opa')
        onPressStartListener()
        // const dataInicial = new Date()
        await handleImage(image)
        // const dataFinal = new Date()
        // const diferenca = dataFinal - dataInicial
        // console.log(diferenca)
    }

    return (
        <View style={[StyleSheet.absoluteFill, {backgroundColor: '#FFF'}]}>
            <Camera
              style={StyleSheet.absoluteFill}
            //   onCapture={handleImage}
            onCapture={start}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.cameraText}>{topClass}</Text>
            </View>    
      </View>
    )
}

const styles = StyleSheet.create({
    labelContainer: {
        alignItems: 'center',
        padding: 20,
        margin: 20,
        marginTop: 40,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    cameraText: {
        fontSize: 18,
        color: '#000'
    },
    view : {
        alignItems: 'center',
        marginHorizontal: 15,
        justifyContent: 'space-between'
    },
    text: {
        color: '#000',
        fontSize: 46,
        lineHeight: 92,

    },
    button: {
        backgroundColor: '#5CC6BA',
        marginVertical: 35,
        padding: 15,
        width: '90%',
        borderRadius: 30,
        alignItems: 'center'
    },
    textButton: {
        fontSize: 20,
        color: '#FFF'
    },
    desc: {
        color: '#000',
        textAlign: 'justify',
        fontSize: 18,
    },
});