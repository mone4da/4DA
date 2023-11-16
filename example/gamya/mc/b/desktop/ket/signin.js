const signinHtml = 
`<div id="signin">
    <div><input id="username" type="text" placeholder="email/address/accesskey" required></div>
    <div><input id="password" type="password" placeholder="password" required></div>
    <div>
        <button id="submit">signin</button>
        <button id="recover">recover password</button>
        <button id="back">back</button>
    </div>
    <div id="message"></div>
</div>`

class Signin{
    constructor(root){
        this.root = root
        this.show()
    }

    onRecover(data){}
    onSubmit(data){}
    onBack(){}

    hide(){
        this.root.innerHTML = ''
    }

    show(){
        this.root.innerHTML = signinHtml
        this.message = document.getElementById('message')

        let username = document.getElementById('username')
        let password = document.getElementById('password')

        document.getElementById('submit').onclick = () => {
            this.onSubmit({username : username.value, password: password.value})
        }

        document.getElementById('recover').onclick = () => {
            this.onRecover({username : username.value})
        }

        document.getElementById('back').onclick = () => {
            this.onBack()
        }
    }

    showError(text){
        this.message.innerText = text
    }


}

const recoverHtml = 
`<div id="recover">
    <div><input id="username" type="text" placeholder="email/address/accesskey"></div>
     <div>
        <button id="submit">recover</button>
     </div>
    <div id="message"></div>
</div>`

class Recover{
    constructor(root, data){
        this.root = root
        this.show()

        let username = document.getElementById('username')
        username.value = data.username

        document.getElementById('submit').onclick = () => {
            this.onSubmit(username.value)
        }
    }

    hide(){
        this.root.innerHTML = ''
    }

    show(){
        this.root.innerHTML = recoverHtml
    }

    onSubmit(data){}

}

const signupHtml = 
`<div id="signup">
    <div><input id="username1" type="text" placeholder="email/address/accesskey" required></div>
    <div><input id="username2" type="text" placeholder="repeat email/address/accesskey" required></div>
    <div><input id="password1" type="password" placeholder="password" required></div>
    <div><input id="password2" type="password" placeholder="repeat password" required></div>
    <div>
        <button id="submit">signup</button>
        <button id="back">back</button>
    </div>
    <div id="message"></div>
</div>`


class Signup{
    constructor(root){
        this.root = root
        this.show()

        this.message = document.getElementById('message')
        this.username1 = document.getElementById('username1')
        this.username2 = document.getElementById('username2')
        this.password1 = document.getElementById('password1')
        this.password2 = document.getElementById('password2')

        document.getElementById('submit').onclick = () => {
            if (this.valid())
                this.onSubmit({username : this.username1.value.trim(), password: this.password1.value.trim()})
            else
                this.onError()
        }

        document.getElementById('back').onclick = () => {
            this.onBack()
        }

        this.showError('')        
    }

    valid(){
        return  this.username1.value === this.username2.value &&
                this.password1.value === this.password2.value
    }

    onError(){}
    onSubmit(data){}
    onBack(){}

    show(){
        this.root.innerHTML = signupHtml
    }

    showError(text){
        this.message.innerText = text
    }

    hide(){
        this.root.innerHTML = ''
    }
}


const receptionHtml = 
`<div id="reception">
<div><h3>Welcome to Gamya</h3></div>
<div><button id="signin">Signin</button></div>
<div><button id="signup">Signup</button></div>
</div>`

class Reception{
    constructor(root){
        this.root = root
        this.show()
    }

    onSignin(){}
    onSignup(){}

    show(){
        this.root.innerHTML = receptionHtml

        document.getElementById('signin').onclick = () => {
            this.onSignin()
        }

        document.getElementById('signup').onclick = () => {
            this.onSignup()
        }
    }

    hide(){
        this.root.innerHTML = ''
    }
}

export{
    Reception,
    Signup,
    Signin,
    Recover
}