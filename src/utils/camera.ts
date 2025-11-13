export class Camera {
    private cameraSelection: string = "";
    private deviceSelection: string = "";
    private adicionado: boolean = false;

    constructor() {
        this.setFirstCamera();
    }

    private setFirstCamera() {

        navigator.mediaDevices.enumerateDevices().then((devices) => {
            devices.forEach((device) => {
                if (device.kind == 'videoinput' && this.deviceSelection == "") {
                    this.deviceSelection = device.deviceId;
                }
            })
        })
    }

    public setDeviceSelection(deviceId: string) {
        console.log("Câmera selecionada: ", deviceId);
        this.deviceSelection = deviceId;
    }

    public listDevices(cameraSelection: string) {

        this.cameraSelection = cameraSelection;
        let deviceHTML = document.getElementById(this.cameraSelection) as HTMLSelectElement;

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                if (!this.adicionado) {
                    devices.forEach((device) => {
                        if (device.kind == 'videoinput') {

                            let option = document.createElement('option');
                            option.value = device.deviceId;
                            option.innerHTML = device.label
                            deviceHTML.appendChild(option);
                        }
                    });
                    this.adicionado = true;
                }

            });
    }


    public getStream(videoElement: string) {

        let video = document.getElementById(videoElement) as HTMLVideoElement;

        navigator.mediaDevices.getUserMedia({ video: { deviceId: this.deviceSelection } })
            .then((stream) => {
                video.width = 400
                video.height = 400
                video.srcObject = stream;
                video.muted = true
                video.play();
            });
    }


    public gravarVideo({ videoElement, stopButtonElement, tempoGravacao }: { videoElement: string, stopButtonElement: string, tempoGravacao: number }): Promise<FormData> {
        return new Promise((resolve) => {

            const videoPlayer = document.getElementById(videoElement) as HTMLVideoElement;
            const stopButton = document.getElementById(stopButtonElement) as HTMLButtonElement;

            let recordedChunks: Array<any> = [];

            videoPlayer.muted = true;
            const stream = videoPlayer.srcObject as MediaStream;

            let mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.start();

            const timerVideo = setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                    mediaRecorder.stop();
                    console.log('Gravação parada...');
                    clearTimeout(timerVideo)
                }
            }, tempoGravacao * 1000)
            console.log('Gravação iniciada...');

            mediaRecorder.onstop = () => {
                const mimeType = mediaRecorder.mimeType;
                const videoBlob = new Blob(recordedChunks, { type: mimeType });
                recordedChunks = [];

                const formData = new FormData();
                formData.append('video', videoBlob, 'webcam_video.webm');
                console.log(formData)
                resolve(formData)
                stream.getTracks().forEach(track => track.stop());
            };

            stopButton.addEventListener("click", () => {
                if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                    mediaRecorder.stop();
                    console.log('Gravação parada...');
                }
            });
        });
    }


}
