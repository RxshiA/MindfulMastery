import React from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = ({value}) => {
    return(
        <>
        {/* {console.log(value)} */}
        <Progress.Bar progress={value} width={200} />
        </>
    )
}

export default ProgressBar