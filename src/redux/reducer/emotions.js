export default function emotions(state="",act){
    const {type,data} = act;
    switch (type) {
        case "setEmotions":
            return data;
        default:
            return state;
    }
}