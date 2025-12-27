// import { encode } from "qrcode.js";
const elInput = document.getElementById("inputURL");
const elBtn = document.getElementById("btn");
const app = document.getElementById("app");
const qrcode_container = document.getElementById("qrcode_qoute");
const loading = document.getElementById("loading");
const inputContainer = document.getElementById("input_container");

const btn_download = document.getElementById("download_link");

const btn_share = document.getElementById("copy-btn");

elBtn.addEventListener("click", async () => {
  const url = elInput.value;

  if (!url) return;

  new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  // const qrCodeData = encode(url);
  // console.log("QR Code Data:", qrCodeData);

  inputContainer.classList.add("__hide");
  loading.classList.remove("__hide");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  downloadQRCode();

  loading.classList.add("__hide");
  app.classList.add("__hide");
  qrcode_container.classList.remove("__hide");
});

function downloadQRCode() {
  const SRC = document.querySelector("#qrcode img").src;
  btn_download.href = SRC;
  btn_download.download = "qrcode.png";
}

btn_share.addEventListener("click", () => {
  shareQRCode();
});

function shareQRCode() {
  const SRC = document.querySelector("#qrcode img").src;

  navigator.clipboard.write([
    new ClipboardItem({ "image/png": fetch(SRC).then((res) => res.blob()) }),
  ]);
}
