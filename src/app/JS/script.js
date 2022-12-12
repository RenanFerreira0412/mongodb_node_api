$(document).ready(function () {
    var user = [];
    var activity = [];
    var subject = []

    var citiesList = [];
    var statesList = [];

    //testa se existe o item token no localStorage do navegador.
    if (localStorage.getItem("token") == null) {

        //Armazenamento local dos tokens 
        localStorage.setItem("token", JSON.stringify([]));
    }

    var dados = {
        "isLogin": true,
        "isAuthenticated": localStorage.getItem("token").length <= 2 ? false : true,
        "user": user,
        "register": { name: "", email: "", password: "", confirmPassword: "", city: "", state: "" },
        "login": { email: "", password: "" },
        "activity": activity,
        "new_activity": { _id: "", name: "", deadline: "", subject: {} },
        "subject": subject,
        "new_subject": { _id: "", name: "", teacher: "" },
        "authPageText": { title: "", actionButton1: "", actionButton2: "", toggleButton: "" },
        "citiesList": citiesList,
        "statesList": statesList,
        "stateInfoUrl": "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    }

    Vue.prototype.$http = axios;

    // global
    Vue.use(window.vuelidate.default);

    const { required, maxLength, minLength, numeric, sameAs } = window.validators

    new Vue({
        el: '#app',
        data: dados,
        validations: {
            login: {
                email: {
                    required,
                },
                password: {
                    required
                }
            },
            register: {
                name: {
                    required,
                    minLength: minLength(6)
                },
                email: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                confirmPassword: {
                    required,
                    sameAsPassword: sameAs('password')
                },
                city: {
                    required
                },
                state: {
                    required
                }
            }
        },
        created: function () {
            this.getStateList();
            this.setFormAction(true);
        },
        methods: {
            status: function (validation) {
                return {
                    error: validation.$error,
                    dirty: validation.$dirty
                }
            },
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
                this.register.state = state;
                this.register.city = '';
                this.citiesList = []
                console.log(state)

                this.getCitiesList(state)
            },

            updateCity: function (city) {
                this.register.city = city;
                console.log(city)
                console.log(this.register.city)
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
            authButton: function (v) {
                //console.log(v.login)
                var login = jQuery.extend({}, this.login);
                var register = jQuery.extend({}, this.register);

                //Verifica se está no formulário de login 
                if (this.isLogin) {
                    if (!v.login.$invalid) { //Realiza o teste de validação
                        this.$http.post('http://localhost:3000/login', login)
                            .then(response => {
                                if (response.data.length != 0) {
                                    console.log('Acesso permitido')
                                    for (let user of response.data) {
                                        console.log(user._id)
                                        this.user.push(user);

                                        //Adiciona no localStorage o token de acesso do usuário
                                        localStorage.setItem("token", JSON.stringify(user._id));
                                    }

                                    //Limpa o formulário
                                    this.cleanFormLogin();

                                    //Habilita o acesso a homepage do site
                                    this.isAuthenticated = true;
                                } else {
                                    console.log('Acesso negado')
                                    alert("Verifique se o email e a senha estão corretos")
                                }
                            }).catch(response => {
                                // error callback
                                alert('Não foi possível logar o usuário');
                                console.log(response);
                            });
                    } else {
                        alert('Preencha todos os campos corretamente !!!')
                    }
                } else { //Caso contrário, o usuário está no formulário de cadastro
                    if (!v.register.$invalid) { //Teste de validação
                        this.$http.post('http://localhost:3000/register', register)
                            .then(response => {
                                console.log(response.data)
                                this.user.push(response.data);

                                //Adiciona no localStorage o token de acesso do usuário
                                localStorage.setItem("token", JSON.stringify(response.data._id));

                                //Limpa o formulário
                                this.cleanFormRegister()

                                //Habilita o acesso a homepage do site
                                this.isAuthenticated = true;
                            }).catch(response => {
                                // error callback
                                alert('Não foi possível cadastrar o usuário');
                                console.log(response);
                            });
                    } else {
                        alert('Preencha todos os campos corretamente !!!')
                    }
                }
            },
            logout: function () {
                const logout = confirm('Desejas sair do app?');

                if (logout) {
                    //Exclui o token do localStorage
                    localStorage.setItem("token", JSON.stringify([]));

                    //Desabilita o acesso a homepage do site
                    this.isAuthenticated = false;
                }
            },
            cleanFormLogin: function () {
                this.login.email = '';
                this.login.password = '';
            },
            cleanFormRegister: function () {
                this.register.name = '';
                this.register.email = '';
                this.register.password = '';
                this.register.confirmPassword = '';
                this.register.state = '';
                this.register.city = '';
            }

        }
    })
});