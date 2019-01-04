(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(29)},29:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(16),o=n(32),u=n(5),i=n(6),c=n(8),s=n(7),m=n(9),h=n(14),p=n(10),d=n(18),f=n(30),g=n(31),E=n(34),b=n(33),v=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(s.a)(t).call(this,e))).imageChosen=function(e){n.setState({picture:e.target.files[0]})},n.uploadImage=function(){var e=new FormData;e.append("file",n.state.picture),fetch("/uploadImage",{method:"POST",body:e}).then(function(e){return e.ok?e:e.json()}).then(function(e){if(e.ok)return e;throw new Error(e.message)}).then(function(e){alert("Image uploaded")}).catch(function(e){alert(e)})},n.state={picture:null},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("input",{type:"file",accept:".gif,.jpg,.jpeg,.png",onChange:this.imageChosen}),r.a.createElement("button",{onClick:this.uploadImage},"upload"))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(s.a)(t).call(this,e))).deleteImage=function(e){fetch("/deleteImage/"+e,{method:"DELETE"}).then(function(e){if(e.ok)return e;throw new Error(e.status)}).then(function(e){n.componentDidMount()}).catch(function(e){console.log("error: "+e)})},n.Item=function(e){return r.a.createElement("li",null,e.value)},n.MyList=function(e){return r.a.createElement("div",null,e.map(function(e){return r.a.createElement("div",null,r.a.createElement("img",{src:"data:image/jpeg;base64,"+e.base64,height:500}),r.a.createElement("br",null),n.props.auth?r.a.createElement("div",null,r.a.createElement("text",null,"Uploader: ",e.uploader),r.a.createElement("br",null),r.a.createElement("text",null,"Filename: ",e.name.split(".").slice(0,-1).join(".")),r.a.createElement("button",{onClick:function(){return n.deleteImage(e.name)}},"Delete")):r.a.createElement("br",null))}))},n.state={images:[]},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("getAllImages",{method:"get"}).then(function(e){if(200==e.status)return e.json()}).then(function(t){e.setState({images:t})})}},{key:"render",value:function(){return this.state.images&&this.state.images.length?r.a.createElement("div",null,this.MyList(this.state.images)):null}}]),t}(a.Component);var O={user:"",admin:!1,isAuthenticated:!1,authenticate:function(e){this.isAuthenticated=!0,this.getRole(e)},signout:function(e){this.user="",this.admin=!1,this.isAuthenticated=!1,e()},getRole:function(e){var t=this;fetch("/roles",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(function(e){if(200===e.status)return e.json()}).then(function(n){t.user=n.username,(t.role="ROLE_ADMIN"===n.authorities[0].name)&&(t.admin=!0),e()})}},w=Object(E.a)(function(e){var t=e.history;return O.isAuthenticated?r.a.createElement("p",null,"Welcome ",O.user,"!",r.a.createElement("button",{onClick:function(){O.signout(function(){return t.push("/")})}},"Sign out")):r.a.createElement("p",null,"You are not logged in.")});function C(e){var t=e.component,n=Object(d.a)(e,["component"]);return r.a.createElement(g.a,Object.assign({},n,{render:function(e){return O.isAuthenticated?r.a.createElement(t,Object.assign({},e,{auth:O.admin})):r.a.createElement(b.a,{to:{pathname:"/login",state:{from:e.location}}})}}))}function y(){return r.a.createElement("h3",null,"Public")}function I(){return r.a.createElement("h3",null,"Protected")}var k=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(s.a)(t).call(this,e))).state={redirectToReferrer:!1,username:"",password:""},n.login=function(e){e.preventDefault();var t=new FormData(e.target);fetch("/perform_login",{method:"POST",body:t}).then(function(e){if(e.ok||401!==e.status){if(e.ok||500!==e.status)return e;throw new Error("Server error, please try again later.")}throw new Error("Wrong username or password")}).then(function(e){O.authenticate(function(){n.setState({redirectToReferrer:!0})})}).catch(function(e){alert(e)})},n.state={redirectToReferrer:!1,username:"",password:""},n.handleInputChange=n.handleInputChange.bind(Object(p.a)(Object(p.a)(n))),n.login=n.login.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,n=t.value,a=t.name;this.setState(Object(h.a)({},a,n))}},{key:"render",value:function(){var e=(this.props.location.state||{from:{pathname:"/"}}).from;return this.state.redirectToReferrer?r.a.createElement(b.a,{to:e}):r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.login},r.a.createElement("label",null,"Username:",r.a.createElement("input",{name:"username",type:"text",value:this.state.username,onChange:this.handleInputChange})),r.a.createElement("br",null),r.a.createElement("label",null,"Password:",r.a.createElement("input",{name:"password",type:"password",value:this.state.password,onChange:this.handleInputChange})),r.a.createElement("input",{type:"submit",value:"Submit"})))}}]),t}(r.a.Component),S=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(c.a)(this,Object(s.a)(t).call(this,e))).state={username:"",password:"",role:"ROLE_USER"},n.handleInputChange=n.handleInputChange.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleInputChange",value:function(e){var t=e.target,n=t.value,a=t.name;this.setState(Object(h.a)({},a,n))}},{key:"render",value:function(){return r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"Username:",r.a.createElement("input",{name:"username",type:"text",value:this.state.username,onChange:this.handleInputChange})),r.a.createElement("br",null),r.a.createElement("label",null,"Password:",r.a.createElement("input",{name:"password",type:"password",value:this.state.password,onChange:this.handleInputChange})),r.a.createElement("label",null,"Choose privileges:",r.a.createElement("select",{name:"role",value:this.state.role,onChange:this.handleInputChange},r.a.createElement("option",{value:"ROLE_USER"},"USER"),O.admin?r.a.createElement("option",{value:"ROLE_ADMIN"},"ADMIN"):null)),r.a.createElement("input",{type:"submit",value:"Submit"}))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=new FormData(e.target);fetch("/registration",{method:"POST",body:t}).then(function(e){return e.ok?e:e.json()}).then(function(e){if(e.ok)return e;throw new Error(e.message)}).then(function(e){alert("User created")}).catch(function(e){alert(e)})}}]),t}(a.Component),R=function(){return r.a.createElement(o.a,null,r.a.createElement("div",null,r.a.createElement(w,null),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(f.a,{to:"/images"},"Images")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/imageUpload"},"Upload Image")),r.a.createElement("li",null,r.a.createElement(f.a,{to:"/register"},"Register"))),r.a.createElement(g.a,{path:"/public",component:y}),r.a.createElement(g.a,{path:"/login",component:k}),r.a.createElement(C,{path:"/protected",component:I}),r.a.createElement(C,{path:"/images",component:j}),r.a.createElement(C,{path:"/imageUpload",component:v}),r.a.createElement(g.a,{path:"/register",component:S})))},D=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(R,null))}}]),t}(a.Component);Object(l.render)(r.a.createElement(o.a,null,r.a.createElement(D,null)),document.getElementById("root"))}},[[20,2,1]]]);
//# sourceMappingURL=main.161d3450.chunk.js.map