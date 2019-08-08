
let listener = {
    init:"",
    homelistener: "",
    destory:"",
    res : ""
}


listener.homelistener = function (path, KeyCode, value1, value2) {
    var res = {
        keycode_now: "",
        keycode_pre: "",
        IFlistener: false,
        type: ""
    };
    switch (path) {
        case "/Home":
            if (value1 === "38" && value2 === "") {
                if (KeyCode === 38) {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "38",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "38" && value2 === "38") {
                if (KeyCode === 38) {
                    res = {
                        keycode_now: "40",
                        keycode_pre: "38",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "40" && value2 === "38") {
                if (KeyCode === 40) {
                    res = {
                        keycode_now: "40",
                        keycode_pre: "40",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "40" && value2 === "40") {
                if (KeyCode === 40) {
                    res = {
                        keycode_now: "37",
                        keycode_pre: "40",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "37" && value2 === "40") {
                if (KeyCode === 37) {
                    res = {
                        keycode_now: "37",
                        keycode_pre: "37",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "37" && value2 === "37") {
                if (KeyCode === 37) {
                    res = {
                        keycode_now: "39",
                        keycode_pre: "37",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "39" && value2 === "37") {
                if (KeyCode === 39) {
                    res = {
                        keycode_now: "39",
                        keycode_pre: "39",
                        IFlistener: false,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }
            }
            else if (value1 === "39" && value2 === "39") {
                if (KeyCode === 39) {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: true,
                        type: "game"
                    }
                }
                else {
                    res = {
                        keycode_now: "38",
                        keycode_pre: "",
                        IFlistener: false,
                        type: "game"
                    }
                }

            }
            else {
                res = {
                    keycode_now: "38",
                    keycode_pre: "",
                    IFlistener: false,
                    type: "game"
                }
            }
            break;
        case "/Home/extra/flybird":

            break;
        default:
            break;
    }
    listener.res = res;
    return res;
}


export default listener;