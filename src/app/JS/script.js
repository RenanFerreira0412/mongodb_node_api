$(document).ready(function () {
    var user = [];
    var activity = [];
    var subject = []

    var citiesList = [];
    var statesList = [];

    var dados = {
        "isLogin": true,
        "user": user,
        "new_user": { name: "", email: "", password: "", confirmPassword: "", city: "", state: "" },
        "login": { email: "", password: "" },
        "activity": activity,
        "new_activity": { name: "", deadline: "", subject: {} },
        "subject": subject,
        "new_subject": { name: "", teacher: "" },
        "authPageText": { title: "", actionButton1: "", actionButton2: "", toggleButton: "" },
        "localidade": { _myState: "", _myCity: "" },
        "citiesList": citiesList,
        "statesList": statesList,
        "stateInfoUrl": "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    }

    Vue.prototype.$http = axios;

    // global
    Vue.use(window.vuelidate.default);

    const { required, maxLength, minValue, numeric } = window.validators

    new Vue({
        el: '#app',
        data: dados,
        validations: {
            login: {
                email: {
                    required
                },
                password: {
                    required,
                    minValue: minValue(6)
                }
            }
        },
        created: function () {
            this.getStateList();
            this.setFormAction(true);
            console.log(this.citiesList)
        },
        methods: {
            setFormAction: function (acao) {
                this.isLogin = acao;
                if (this.isLogin) {
                    this.authPageText.title = 'Olá, bem-vido!';
                    this.authPageText.actionButton1 = 'Ainda não tem conta?';
                    this.authPageText.actionButton2 = 'Cadastre-se agora!';
                    this.authPageText.toggleButton = 'Entrar';
                } else {
                    this.authPageText.title = 'Crie uma conta';
                    this.authPageText.actionButton1 = 'Já possui uma conta?';
                    this.authPageText.actionButton2 = 'Entrar';
                    this.authPageText.toggleButton = 'Cadastrar';
                }
            },

            updateState: function (state) {
                this.localidade._myState = state;
                this.localidade._myCity = '';
                this.citiesList = []
                console.log(state)

                this.getCitiesList(state)
            },

            updateCity: function (city) {
                this.localidade._myCity = city;
                console.log(city)
                console.log(this.localidade._myCity)
            },

            getStateList: async function () {
                await this.$http.get(this.stateInfoUrl).then(response => {

                    response.data.forEach(state => {
                        this.statesList.push(state);
                        console.log(state)
                    });


                    console.log('Estados brasileiros: ' + response.data);
                }).catch(error => {
                    alert('Erro ao carregar os estados: ' + error.response.data);
                });
            },
            getCitiesList: async function (state) {
                var cityInfoUrl =
                    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`;

                await this.$http.get(cityInfoUrl).then(response => {

                    response.data.forEach(city => {
                        this.citiesList.push(city);
                        console.log(city)
                    });

                }).catch(error => {
                    alert('Erro ao carregar as cidades: ' + error.response.data);
                });
            },
            login: function (v) {

            }
        }
    })
});