var Numberz = React.createClass({
getInitialState: function() {
return {
peoples : [],
people_data : {}
};
},
componentDidMount(){
this.getPeople()
},
changePeople:function(url){
var self = this;
this.state.peoples.forEach(function(data){
if(data.url == url){
self.setState({people_data:data})
}
})
},
getPeople : function(people_id){
var url = "https://swapi.co/api/people/"
if(people_id){	
url += people_id+"/"
}
url += "?format=json"	
$.ajax({
url: url,
dataType: 'json',
cache: true,
type: 'get',
beforeSend: function() {
},
success: function(res_data) {
if(res_data){
var data = {},people_data={}
if(res_data.hasOwnProperty('results') && res_data.results.length>0){
data = res_data.results[0]
}else{
data = res_data
}
people_data.name = data.name
people_data.height = data.height
people_data.hair_color = data.hair_color
people_data.skin_color = data.skin_color
people_data.eye_color = data.eye_color
people_data.birth_year = data.birth_year
people_data.mass = data.mass
people_data.gender = data.gender
people_data.url = data.url
var set_object = {}
set_object.people_data = people_data
set_object.peoples = res_data.results
this.setState(set_object)
}
}.bind(this),
complete: function() {
},
error: function(xhr, status, err) {
console.error(this.props.url, status, err.toString());
}.bind(this)
});
},
render: function() {
return (
<div>
<div className="starwars_box">
<div className="header">
<h3 className="">STARWARS catalogue // </h3>    
</div>
<div className="info_box">
<div className="info_left">
<div className="box">
<h3 className="sw_h3">list of Characters  //</h3>
<hr/>
<PeopleRow peoples = {this.state.peoples} changePeople={this.changePeople}/>
</div>
</div>
<div className="info_right">
<h3 className="sw_h3">About {this.state.people_data.name}  //</h3>
<hr/>
<PeopleDetails  people_data = {this.state.people_data}/>
</div>
</div>  
</div>
</div>
) ;  
}
})

var PeopleDetails = React.createClass({
render: function() {
return (
<div className="">
<div className="_details">
<div className="_title">Name</div>
<span className="_output">{this.props.people_data.name}</span>
</div>
<div className="_details">
<div className="_title">Height</div>
<span className="_output">{this.props.people_data.height}</span>
</div>
<div className="_details">
<div className="_title">Mass</div>
<span className="_output">{this.props.people_data.mass}</span>
</div>
<div className="_details">
<div className="_title">Hair Color</div>
<span className="_output">{this.props.people_data.hair_color}</span>
</div>
<div className="_details">
<div className="_title">Skin Color</div>
<span className="_output">{this.props.people_data.skin_color}</span>
</div>
<div className="_details">
<div className="_title">Eye Color</div>
<span className="_output">{this.props.people_data.eye_color}</span>
</div>
<div className="_details">
<div className="_title">Birth Year</div>
<span className="_output">{this.props.people_data.birth_year}</span>
</div>
<div className="_details">
<div className="_title">Gender</div>
<span className="_output">{this.props.people_data.gender}</span>
</div>
</div>
)
}
});

var PeopleRow = React.createClass({
changePeople : function(url){
this.props.changePeople(url)
},
render: function() {
var people_list = []
var self = this
this.props.peoples.forEach(function(data){
people_list.push(<li><a className="a" onClick={self.changePeople.bind(this,data.url)} href="#">{data.name}</a></li>)
})
return (
<div className="">
<ul className="_ul">
{people_list}
</ul>
</div>
)
}
});

ReactDOM.render(
<Numberz />,
document.getElementById('starwars_numberz')
);

