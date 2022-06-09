// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data }) => {
    // const dataKeys = data.map((key)=>{
    //     return key.rate;
    // })
    return(
    <ResponsiveBar
        data={data}
        keys={["rate"]}
        indexBy="age"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.15}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        }}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}

        role="application"
        isFocusable={true}
    />
    )
    }

export default MyResponsiveBar;