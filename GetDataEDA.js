export const GetDataEDA = async () => {
    const weeklyDataURL = 'https://oracle.browse.wf/weekly'
    const missionDetailsDictURL = 'https://oracle.browse.wf/dicts/en.json'
    const missionTypeDictURL = 'https://browse.wf/warframe-public-export-plus/dict.en.json'

    try {
        const weeklyDataResponse = await fetch(weeklyDataURL)
        const missionDetailsDictResponse = await fetch(missionDetailsDictURL)
        const missionTypeDictResponse = await fetch(missionTypeDictURL)

        if (!weeklyDataResponse.ok) {
            throw new Error(`HTTP error! Status: ${weeklyDataResponse.status} \nAn error occurred while fetching "${weeklyDataURL}"`)
        }

        if (!missionDetailsDictResponse.ok) {
            throw new Error(`HTTP error! Status: ${missionDetailsDictResponse.status} \nAn error occurred while fetching "${missionDetailsDictURL}"`)
        }

        if (!missionTypeDictResponse.ok) {
            throw new Error(`HTTP error! Status: ${missionTypeDictResponse.status} \nAn error occurred while fetching "${missionTypeDictURL}"`)
        }

        const weeklyData = await weeklyDataResponse.json()
        const missionDetailsDict = await missionDetailsDictResponse.json()
        const missionTypeDict = await missionTypeDictResponse.json()



        const stelaFarm = weeklyData.labConquestMissions.some(mission => mission.variant === "InfiniteTide")

        if(!stelaFarm){
            console.log("Exited Early, No Stela Farm Detected.")
            return null
        }

        return {
            expiry: weeklyData.expiry,

            missions: weeklyData.labConquestMissions.map(mission => {
                return {
                    name: missionTypeDict[`/Lotus/Language/Missions/MissionName_${mission.type}`],
    
                    variant: {
                        name: mission.variant,
                        description: missionDetailsDict[`/Lotus/Language/Conquest/MissionVariant_LabConquest_${mission.variant}_Desc`]
                    },
    
                    conditions: mission.conditions.map(condition => {
                        return {
                            name: condition,
                            description: missionDetailsDict[`/Lotus/Language/Conquest/Condition_${condition}_Desc`]
                        }
                    })
                }
            }),

            modifiers: weeklyData.labConquestFrameVariables.map(modifier => {
                return {
                        name: modifier,
                        description: missionDetailsDict[`/Lotus/Language/Conquest/PersonalMod_${modifier}_Desc`]
                    }
            })
        }
    }
    catch (error) {
        console.error(`Error in getDataEDA \n${error.stack}`)
    }
}