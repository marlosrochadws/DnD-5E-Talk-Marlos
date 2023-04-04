var diceTable = document.getElementById('canvas'); // diceTable é o canvas

var $box = new $dice.dice_box(diceTable, { w: 300, h: 300 }); // Passando o container e dimensoes para a variavel de ambiente $ dice

var $chart = null;

function setPlayerPic(result) {
    switch (result) {
        case 'feliz':
            document.querySelector("[data-enemy-pic]").setAttribute('data-enemy-pic','trizte');
            document.querySelector("[data-player-pic]").setAttribute('data-player-pic','feliz');
            break;
        case 'trizte':
            document.querySelector("[data-enemy-pic]").setAttribute('data-enemy-pic','feliz');
            document.querySelector("[data-player-pic]").setAttribute('data-player-pic','trizte');
            break;
        case 'normal':
            document.querySelector("[data-enemy-pic]").setAttribute('data-enemy-pic','normal');
            document.querySelector("[data-player-pic]").setAttribute('data-player-pic','normal');
            break;
    }    
}

const app = Vue.createApp({
    data() {
        return { // Valores que Vue vai retornar para o HTML
            result:null, // Resultado final
            resultList:[], // Lista de cada resultado
            sum_count:0, // Somatório de quantas vezes foi executado rolagem
            result_box:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},  // Para quantidade de resultados para cada face até 20 (REMOVIDO)
            myChart:null, // Para o char (REMOVIDO)
        }
    },
    mounted() { // cria os charts(REMOVIDO)
        /*this.$nextTick(function () {
            
            $chart = new Chart(document.getElementById('myChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
                    datasets: [{
                        label: 'Count',
                        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive:true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    legend:{
                        labels:{
                            filter: function(items) {
                                return false;
                            }
                        }
                    }
                }
            }); 

        })*/
    },
    methods:{
        calc(value){ // incrementos dos resultados no data()
            this.sum_count += 1; // incrementa quantas vezes foi executado rolagens

            this.result_box[value] += 1;  // Na posição do valor resultado, incrementa em 1 a quantidade

            /*let data = [];
            for(let i = 0; i <= 20; i++){
                data[i] = this.result_box[i+1];
            }
            $chart.data.datasets[0].data = data;
            $chart.update(); */
        },
        throw_dice(dices){
            let self = this;
            if(!dices) {
                dices = ['d4','d6','d8','d10','d12','d20'];
            }
            let resultObject = {vec:null, value:null};

            resultObject.vec = $box.start_throw(function(vectors, notation, callback){ // before_roll

                document.querySelectorAll("[data-throw-btn]").forEach((tag) => {  // desabilitando todos os botões de rolagem
                    tag.disabled = true;
                });
                diceTable.style.display = 'block'; //Mostra diceTable
                diceTable.style.width = window.innerWidth - 1 + 'px';
                diceTable.style.height = window.innerHeight - 1 + 'px';
                $box.reinit(diceTable, { w: 500, h: 300 });
                
                callback();
            }, function(notation, result){ // after_roll
                document.querySelectorAll("[data-throw-btn]").forEach((tag) => { // habilitando todos os botões de rolagem
                    tag.disabled = false;
                });

                resultObject.value = result.join(' ');
                self.result = resultObject.value;
                diceTable.style.display = 'none';
                self.resultList.push(resultObject);
                self.calc(resultObject.value);

                setTimeout(function() { 
                    // CHECK FOR POPUP
                    let popupActive = document.querySelector(".popup-test.active");
                    if(popupActive) {
                        let totalRollValue = 0;
                        let fieldBonus = document.querySelector(".char-att.active [data-bonus]");
                        let fieldRoll = document.querySelector(".char-att.active [data-throw-result]");
                        document.querySelector("[data-result-value]").innerHTML = '';
                        document.querySelectorAll(".result").forEach(function (el){
                            el.classList.remove("active");
                        });
                        if(fieldBonus) {
                            let value_1 = parseInt(fieldBonus.innerHTML);
                            totalRollValue += value_1;
                        }
                        if(fieldRoll) {
                            let value_2 = parseInt(fieldRoll.innerHTML);
                            totalRollValue += value_2;
                            console.log(value_2);
    
                            switch (value_2) {
                            case 1:
                                let d20Active = document.querySelector(".char-att.active[data-roll=d20]");
                                if(d20Active) {
                                    document.querySelector("[data-critical-failure]").classList.add('active');
                                    document.querySelector("[data-result-value]").innerHTML = '';
                                    setPlayerPic('trizte');
                                } else {
                                    document.querySelector("[data-result-value]").innerHTML = totalRollValue;
                                }                                
                                break;
                            case 20:
                                document.querySelector("[data-critical-success]").classList.add('active');
                                document.querySelector("[data-result-value]").innerHTML = totalRollValue;
                                setPlayerPic('feliz');
                                break;
                            default:
                                document.querySelector("[data-result-value]").innerHTML = totalRollValue;
                                setPlayerPic('normal');
                                
                                var difficultyElem = document.querySelector(".test-difficulty.active [data-difficulty-class]");
                                if (difficultyElem) { //DIFFICULTY CLASS
                                    var difficultyClass= parseInt(difficultyElem.innerHTML);
                                    if(totalRollValue >= difficultyClass) {
                                        document.querySelector("[data-success]").classList.add('active');
                                        setPlayerPic('feliz');
                                    } else if(totalRollValue < difficultyClass) {
                                        document.querySelector("[data-failure]").classList.add('active');
                                        setPlayerPic('trizte');
                                    }
                                }
                                var savingElem = document.querySelector(".test-saving.active [data-saving-throw]");
                                if (savingElem) { //SAVING THROW
                                    var savingThrow = parseInt(savingElem.innerHTML);
                                    if(totalRollValue >= savingThrow) {
                                        document.querySelector("[data-success]").classList.add('active');
                                        setPlayerPic('feliz');
                                    } else if(totalRollValue < savingThrow) {
                                        document.querySelector("[data-failure]").classList.add('active');
                                        setPlayerPic('trizte');
                                    }
                                }
                                var armorElem = document.querySelector(".test-armor.active [data-armor-class]");
                                if (armorElem) { //ARMOR CLASS
                                    var armorClass = parseInt(armorElem.innerHTML);
                                    if(totalRollValue >= armorClass) {
                                        document.querySelector("[data-success]").classList.add('active');
                                        setPlayerPic('feliz');
                                    } else if(totalRollValue < armorClass) {
                                        document.querySelector("[data-failure]").classList.add('active');
                                        setPlayerPic('trizte');
                                    }
                                }
                                break;
                            };
                            document.querySelector(".test-result").classList.add('active');
                        }
                    }    
                }, 200);

                
            }, dices );
        },
        re_throw_dice(item){

            let result_vectors = $box.start_throw(function(vectors, notation, callback){
                document.querySelectorAll("[data-throw-btn]").forEach((tag) => {
                    tag.disabled = true;
                });
                // document.getElementById('throw').disabled = true;
                diceTable.style.display = 'block';        
                diceTable.style.width = window.innerWidth - 1 + 'px';
                diceTable.style.height = window.innerHeight - 1 + 'px';
                $box.reinit(diceTable, { w: 500, h: 300 });    
                callback();
            }, function(notation, result){
                document.querySelectorAll("[data-throw-btn]").forEach((tag) => {
                    tag.disabled = false;
                });
                // document.getElementById('throw').disabled = false;
                self.result = result.join(' ');
                diceTable.style.display = 'none';
            }, item.vec);
        },
    }
})

const vm = app.mount('#app')