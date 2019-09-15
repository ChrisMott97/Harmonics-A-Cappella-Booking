import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="row">
                        <div className="col-6 offset-3">
                            <div className="card-body">
                                <h3 className="center">Harmonics Audition</h3>
                                <Route exact path="/" component={Email}/>
                                <Route path="/email" component={Email}/>
                                <Route path="/name" component={Name}/>
                                <Route path="/day" component={Days}/>
                                <Route path="/time" component={Times}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.setState({redirect: true})
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {this.state.redirect
                    ? <Redirect to="/name"/>
                    : null}
                <div className="form-group">
                    <label htmlFor="email">Exeter Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={(e) => this.handleChange(e)}
                        placeholder="e.g. cm740"/>
                    <small id="emailHelp" className="form-text text-muted">The bit of your exeter email address before the @ !</small>
                </div>
                <button type="submit" className="btn btn-primary">Next</button>
            </form>
        )
    }
}

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.setState({redirect: true})
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {this.state.redirect
                    ? <Redirect to="/day"/>
                    : null}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="e.g. Chris Mott"
                        onChange={(e) => this.handleChange(e)}/>
                </div>
                <button type="submit" className="btn btn-primary">Next</button>
            </form>
        )
    }
};
class Days extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false,
            index: 0
        };

        this.days = ["Monday", "Tuesday", "Wednesday"]

        this.handleClick = this
            .handleClick
            .bind(this);
    }
    handleClick = (e, day, index) => {
        // setDay(e.target.innerText)
        this.setState({value: day, index: index})
        this.setState({redirect: true})
    }
    render() {
        return (
            <form>
                {this.state.redirect
                    ? <Redirect to="/time"/>
                    : null}
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <div className="list-group" id="list-tab" role="tablist">
                                {this.days.map((day, index)=>{
                                    const ui = (this.state.index == index) ? 
                                    <Item handleClick={this.handleClick} index={index} item={day} active/> : 
                                    <Item handleClick={this.handleClick} index={index} item={day}/>
                                    return ui
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

class Times extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false,
            index: 0
        };

        this.times = ["12:00", "12:15", "12:30", "12:45", "13:00"]

        this.handleClick = this
            .handleClick
            .bind(this);
    }
    handleClick = (e, time, index) => {
        this.setState({value: time, index: index})
        this.setState({redirect: true})
    }
    render() {
        return (
            <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <div className="list-group" id="list-tab" role="tablist">
                                {this.times.map((time, index)=>{
                                    const ui = (this.state.index == index) ? 
                                    <Item handleClick={this.handleClick} index={index} item={time} active/> : 
                                    <Item handleClick={this.handleClick} index={index} item={time}/>
                                    return ui
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

class Item extends React.Component{
    constructor(props){
        super(props)
        this.active = "list-group-item list-group-item-action active";
        this.inactive = "list-group-item list-group-item-action";
    }
    render(){
        return(
            <div
                className={this.props.active ? this.active : this.inactive}
                data-toggle="list"
                role="tab"
                onClick={(e) => this.props.handleClick(e, this.props.item, this.props.index)}
                >{this.props.item}
            </div>
        )
    }
}

export default App;
