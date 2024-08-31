import moveSound from "../assets/sounds/move-self.mp3";
import captureSound from "../assets/sounds/capture.mp3";
import notifySound from "../assets/sounds/notify.mp3";

export const removeClassByPrefix = (el: HTMLElement | null, prefix: string) => {
  let pattern = "(" + prefix + "(\\s|(-)?(\\w*)(\\s)?)).*?";
  var regEx = new RegExp(pattern, "g");
  if (el) el.className = el?.className.replace(regEx, "");
};

export const playSound = () => {
  new Audio(moveSound).play();
};
export const playCaptureSound = () => {
  new Audio(captureSound).play();
};

export const playNotifySound = () => {
  new Audio(notifySound).play();
};
