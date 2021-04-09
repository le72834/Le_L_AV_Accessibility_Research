import AudioComponent from './components/TheAudioComponent.js';
import VideoComponent from './components/TheVideoComponent.js';


const router = new VueRouter ({
    routes: [
        {path: '/', name: 'Audio', component: AudioComponent},
        {path: '/video', name: 'Video', component: VideoComponent}
        ]
});

(() => {

    const vm = new Vue({
        router,
    }).$mount("#app");
})();