export class Camera {
    private cameraSelection: string = "";
    private deviceSelection: string = "";
    private adicionado: boolean = false;

    constructor(){
        this.setFirstCamera();
    }

    private setFirstCamera(){

        navigator.mediaDevices.enumerateDevices().then((devices)=>{
            devices.forEach((device)=>{
                if (device.kind == 'videoinput' && this.deviceSelection == ""){
                    this.deviceSelection = device.deviceId;
                } 
            })
        })
    }

    public setDeviceSelection(deviceId: string){
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


    public getStream(videoElement:string) {

        let video = document.getElementById(videoElement) as HTMLVideoElement;

        navigator.mediaDevices.getUserMedia({ video: { deviceId: this.deviceSelection } })
            .then((stream) => {
                
                video.srcObject = stream;
                video.play();
            });
    }
}
