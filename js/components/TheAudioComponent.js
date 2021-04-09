export default {
    name: "TheAudioComponent",
    template: `
        <div class="audio-pro">
            <div class="nav-con">
                <div class="logo"><img src="images/logo1.png" alt="logo" ></div>
                <div class="type-op">
                    <router-link class="typeCon" to="/">Music</router-link>
                    <router-link class="typeCon" to="/video">Movie/TvShow</router-link>
                </div>
                <h2>Music</h2>
                
            </div>
        
                <div class="audio-player">
                    <!-- <audio>
                        <source src="audio/sound_of_silence.mp3" type="audio/mp3">
                       
                    </audio> -->
                    <ul>
                    <div class="audio-item" v-if="$index === currentTrackIndex"  v-for="(track, $index) in tracks" :key="$index"></div>
                    </ul>
                </div>
                
                <div class="album-info" v-if="currentTrack">
                    <div class="album-pic"><img src="images/album.jpg"></div>
                   
                    <div class="audio-info">
                    <h3>{{ currentTrack.name }}</h3>
                    <p>{{ currentTrack.artist}}</p>
                    </div>
                </div>
               
                <div class="audio-control">
                    <div class="play-pause-con" @click="play">
                    <i class="far fa-pause-circle fa-lg" v-if="isPlaying"></i>
                    <i class="fas fa-play fa-lg" v-else></i>

                    </div>
                    <div class="rewind-con" @click="resetMusic"><i class="fas fa-backward fa-lg"></i></div>
                    <a :href="currentTrack.url" target="_blank" class="audio-link"><i class="fas fa-link fa-lg"></i></a>
                    <!-- <div class="mute-con" @click="muted">
                    <i class="fas fa-volume-mute" v-if="isPlaying"></i>
                    <i class="fas fa-volume-up" v-else></i>
                    
                    </div> -->

                </div>
                <div class="progress" ref="progress">
                    
                    <div class="progress-duration">{{duration}}</div>
                    <div class="progress-bar" @click="playProgress">
                        <div class="current-bar" :style="{width: barWidth}"></div>
                    </div>
                    <div class="proress-time">{{currentTime}}</div>
                    
                </div>

            <div class="lyric-con">
                <div class="lyric-but"><button>Lyric</button></div>
                    <section class="lyric-text">
                        <div class="lyric1">
                        Hello darkness, my old friend
                        I've come to talk with you again
                        Because a vision softly creeping
                        Left its seeds while I was sleeping
                        And the vision that was planted in my brain
                        </div>
                        <div class="lyric1">
                        Still remains
                        Within the sound of silence
                        In restless dreams I walked alone
                        Narrow streets of cobblestone
                        'Neath the halo of a street lamp
                        I turned my collar to the cold and damp
                        When my eyes were stabbed by the flash of a neon light
                        That split the night
                        </div>
                        <div class="lyric1">
                        And touched the sound of silence
                        And in the naked light, I saw
                        Ten thousand people, maybe more
                        People talking without speaking
                        People hearing without listening
                        People writing songs that voices never share
                        And no one dared
                        Disturb the sound of silence
                        "Fools", said I, "You do not know
                        Silence like a cancer grows
                        Hear my words that I might…
                        </div>
                </section>
            </div>
        </div>

        
   
    `,
    data() {
        return {
            barWidth: null,
            duration: null,
            currentTime: null,
            isPlaying: false,
            duration: null,
          currentTrackIndex: 0,
          currentTrack: null,
          //volume: 100,
          tracks: [
              {
                  name: "Sound of silence",
                  artist: "Disturbed",
                  source: "audio/silence.mp3",
                  url: "https://www.youtube.com/watch?v=u9Dg-g7t2l4",
              }
          ]
        };

    },
    methods: {
        play() {
            if(this.audio.paused) {
                this.audio.play();
                this.isPlaying = true;
            }else {
                this.audio.pause();
                this.isPlaying = false;
            }
        },
        
        musicTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + '%';
            this.circleLeft = width + "%";
            let durminus = Math.floor(this.audio.duration / 60);
            let dursecond = Math.floor(this.audio.duration - durminus * 60);
            let currentmin = Math.floor(this.audio.currentTime / 60);
            let currentsec = Math.floor(this.audio.currentTime - currentmin * 60);
            if(durminus < 10) {
                durminus = "0" + durminus;
            }
            if(dursecond < 10) {
                dursecond = "0" + dursecond;
            }
            if(currentmin < 10) {
                currentmin = "0" + currentmin;
            }
            if(currentsec < 10) {
                currentsec = "0" + currentsec;
            }
            this.duration = durminus + ":" + dursecond;
            this.currentTime = currentmin + ":" + currentsec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
          if (percentage > 100) {
            percentage = 100;
          }
          if (percentage < 0) {
            percentage = 0;
          }
          this.barWidth = percentage + "%";
          this.circleLeft = percentage + "%";
          this.audio.currentTime = (maxduration * percentage) / 100;
          this.audio.play();
        },
        playProgress(e) {
            this.isPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        resetMusic() {
            this.barWidth = 0;
          this.circleLeft = 0;
          this.audio.currentTime = 0;
          this.audio.src = this.currentTrack.source;
          setTimeout(() => {
            if(this.isTimerPlaying) {
              this.audio.play();
            } else {
              this.audio.pause();
            }
          }, 300);
        },
        // muted() {
        //     if(this.audio.muted) {
        //         volume: 0;
        //     }
        // }
    },
    created() {
        this.audio = new Audio();
        this.currentTrack = this.tracks[0];
        this.audio.src = this.currentTrack.source;
        let vm = this;
        this.audio.ontimeupdate = function() {
            vm.musicTime();
        };
        this.audio.onloadedmetadata = function() {
            vm.musicTime();
          };
          this.audio.onended = function() {
              this.isPlaying = true;
          };
          for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            //document.head.appendChild(link)
          }

    },
    mounted(){
        let lyrics = document.querySelector('.lyric-text');
        let lyricButton = document.querySelector('.lyric-but button');

        lyricButton.onclick = function() {
            if(lyricButton.textContent === 'Lyric'){
                lyricButton.textContent = 'Hide Lyric';
                lyrics.classList = 'showLyric';
            }else {
                lyricButton.textContent = 'Lyric';
                lyrics.classList = 'hideLyric';
            }
        };

    }
}