import { GenerateEmbed } from "./GenerateEmbed.js";
import { GetDataEDA } from "./GetDataEDA.js";
import { WFMessage } from "./MessageFunc.js";

const EliteDeepAchimedia = await GetDataEDA()

if (EliteDeepAchimedia) {
        
    WFMessage(GenerateEmbed(EliteDeepAchimedia))
}
