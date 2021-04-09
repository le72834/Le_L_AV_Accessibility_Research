export default {
    name: "TheVideoComponent",
    template: `
    <div>
        <div class="nav-con">
            <div class="logo"><img src="images/logo1.png" alt="logo" ></div>
            <div class="type-op">
            <router-link class="typeCon" to="/">Music</router-link>
            <router-link class="typeCon" to="/video">Movie/TvShow</router-link>
            </div>
        </div>
        <h2>Movie and TVShow</h2>
            <div class="vid-con">
                <video controls preload="metadata" poster="images/movie1.png">
                    <source src="video/Beauty.mp4" type="video/mp4">
                    <track kind="captions" label="English" srclang="en" src="captions/Beauty.vtt">
                   
                </video>
                <section class="speed">
                    <h3>Change your speed:</h3>
                        <ul>
                            <li @click="slowerSpeed">0.5x</li>
                            <li @click="slowSpeed">0.75x</li>
                            <li @click="fastSpeed">1.5x</li>
                        </ul>
                </section>
                
                <h3>Stars: Emma Watson, Dan Stevens, Luke Evans </h3>
                <p>A selfish Prince is cursed to become a monster for the rest of his life, unless he learns to fall in love with a beautiful young woman he keeps prisoner.</p>
            </div>
            <div class="sub-vid">
            <video controls preload="metadata" poster="images/movie2.png">
                    <source src="video/Deadpool.mp4" type="video/mp4">
                    <track kind="captions" label="English" srclang="en" src="captions/Deadpool.vtt"
					default>
            </video>
            <div class="sub-text"><h3>Stars: Ryan Reynolds, Morena Baccarin, T.J. Miller</h3>
            <p>A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.</p></div>
            <section class="speed">
                    <h3>Change your speed:</h3>
                        <ul>
                            <li @click="slowerSpeed">0.5x</li>
                            <li @click="slowSpeed">0.75x</li>
                            <li @click="fastSpeed">1.5x</li>
                        </ul>
                </section>
                
            </div>
    </div>`,
    methods: {
        slowerSpeed() {
            let video = document.querySelector('video');
            video.playbackRate = 0.5;
        },
        slowSpeed() {
            let video = document.querySelector('video');
            video.playbackRate = 0.75;
        },
        fastSpeed() {
            let video = document.querySelector('video');
            video.playbackRate = 1.5;
        }
    },
    created() {
        

    },
   
    mounted() {
        console.log("Video is working");
        var video = document.querySelector('video');
        
        video.addEventListener('load', function() {
            let tracks = video.textTracks[0];
                tracks.mode = 'showing';
        
           
            
        });
       
    }
}