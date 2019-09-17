import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import './App.scss';
import {Session} from 'bc-react-session';

class App extends React.Component {
    render() {
        return (
            <Switch>
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
                                <Route path="/finish" component={Finish}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Route path="/admin" component={Admin}/>
                        <Route path="/settings" component={Settings}/>
                    </div>
                </div>
            </Switch>
        )
    }
}

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };

        this.days = ["Monday", "Tuesday", "Wednesday"];
        this.times = ["12:00", "12:15", "12:30", "12:45", "13:00"];

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="col-8">
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                {this
                                    .days
                                    .map((item) => {
                                        return (
                                            <th scope="col">{item}</th>
                                        )
                                    })}
                            </tr>
                        </thead>
                        <tbody>
                            {this
                                .times
                                .map((item) => {
                                    return (
                                        <tr>
                                            <th scope="row">{item}</th>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <div className="card"></div>
                </div>
            </div>
        )
    }
}
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <table>
                Settings
            </table>
        )
    }
}

class Email extends React.Component {
    componentDidMount(){
        Session.destroy()
        fetch('/api')
        .then(res => res.json())
        .then(list => console.log(list))
    }
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleNext = this
            .handleNext
            .bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleNext(e){
        Session.start({ 
            payload: {
                username: this.state.value
            },
            expiration: 86400000 // (optional) defaults to 1 day
        });
        console.log(Session.get().payload)
        this.setState({next: true})
        e.preventDefault();
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleNext(e)}>
                {this.state.next
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
                        placeholder="e.g. cm740"
                        autoFocus
                        required/>
                    <small id="emailHelp" className="form-text text-muted">The bit of your exeter email address before the @ !</small>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="submit" className="btn btn-primary">Next</button>
                </div>
            </form>
        )
    }
}

class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.handleRestart = this
            .handleRestart
            .bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleNext(){
        Session.setPayload({
            name: this.state.value
        })
        console.log(Session.get().payload)
        this.setState({next: true})
    }
    handleBack(){
        this.setState({back: true})
    }
    handleRestart(){
        this.setState({restart: true})
    }
    render() {
        return (
            <form onSubmit={()=>this.handleNext()}>
                {this.state.next
                    ? <Redirect to="/day"/>
                    : null}
                {this.state.back
                    ? <Redirect to="/email"/>
                    : null}
                {this.state.restart
                    ? <Redirect to="/email"/>
                    : null}
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="e.g. Chris Mott"
                        onChange={(e) => this.handleChange(e)}
                        autoFocus
                        required/>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.handleBack} type="button" className="btn btn-secondary">Back</button>
                    <button onClick={this.handleRestart} type="button" className="btn btn-danger">Restart</button>
                    <button type="submit" className="btn btn-primary">Next</button>
                </div>
            </form>
        )
    }
};
class Days extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            index: -1,
            disabled: true
        };

        this.days = ["Monday", "Tuesday", "Wednesday"]

        this.handleClick = this
            .handleClick
            .bind(this);
        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.handleRestart = this
            .handleRestart
            .bind(this);
    }
    handleClick = (e, day, index) => {
        // setDay(e.target.innerText)
        this.setState({value: day, index: index, disabled: false})
    }
    handleNext(e){
        Session.setPayload({
            day: this.state.value
        })
        console.log(Session.get().payload)
        this.setState({next: true})
        e.preventDefault();
    }
    handleBack(){
        this.setState({back: true})
    }
    handleRestart(){
        this.setState({restart: true})
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleNext(e)}>
                {this.state.next
                    ? <Redirect to="/time"/>
                    : null}
                {this.state.back
                    ? <Redirect to="/name"/>
                    : null}
                {this.state.restart
                    ? <Redirect to="/email"/>
                    : null}
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <div className="list-group" id="list-tab" role="tablist">
                                {this
                                    .days
                                    .map((day, index) => {
                                        const ui = (this.state.index === index)
                                            ? <Item handleClick={this.handleClick} index={index} item={day} active/>
                                            : <Item handleClick={this.handleClick} index={index} item={day}/>
                                        return ui
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.handleBack} type="button" className="btn btn-secondary">Back</button>
                    <button onClick={this.handleRestart} type="button" className="btn btn-danger">Restart</button>
                    {(this.state.disabled)
                        ? <button type="submit" disabled className="btn btn-primary">Next</button>
                        : <button type="submit" className="btn btn-primary">Next</button>
                    }
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
            index: -1,
            disabled: true
        };

        this.times = ["12:00", "12:15", "12:30", "12:45", "13:00"]

        this.handleClick = this
            .handleClick
            .bind(this);
        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.handleRestart = this
            .handleRestart
            .bind(this);
            
    }
    handleClick = (e, time, index) => {
        this.setState({value: time, index: index, disabled: false})
    }
    handleNext(e){
        Session.setPayload({
            time: this.state.value
        })
        console.log(Session.get().payload)
        this.setState({next: true})
        e.preventDefault();
    }
    handleBack(){
        this.setState({back: true})
    }
    handleRestart(){
        this.setState({restart: true})
    }
    render() {
        return (
            <form onSubmit={(e)=>this.handleNext(e)}>
                {this.state.next
                    ? <Redirect to="/finish"/>
                    : null}
                {this.state.back
                    ? <Redirect to="/day"/>
                    : null}
                {this.state.restart
                    ? <Redirect to="/email"/>
                    : null}
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <div className="list-group" id="list-tab" role="tablist">
                                {this
                                    .times
                                    .map((time, index) => {
                                        const ui = (this.state.index === index)
                                            ? <Item handleClick={this.handleClick} index={index} item={time} active/>
                                            : <Item handleClick={this.handleClick} index={index} item={time}/>
                                        return ui
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.handleBack} type="button" className="btn btn-secondary">Back</button>
                    <button onClick={this.handleRestart} type="button" className="btn btn-danger">Restart</button>
                    {(this.state.disabled)
                        ? <button type="submit" disabled className="btn btn-primary">Next</button>
                        : <button type="submit" className="btn btn-primary">Next</button>
                    }
                </div>
            </form>
        )
    }
}

class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.handleRestart = this
            .handleRestart
            .bind(this);
    }

    handleNext(){
        console.log(Session.get().payload)
        this.setState({next: true})
    }
    handleBack(){
        this.setState({back: true})
    }
    handleRestart(){
        this.setState({restart: true})
    }
    render() {
        return (
            <form onSubmit={()=>this.handleNext()}>
                {this.state.next
                    ? <Redirect to="/thanks"/>
                    : null}
                {this.state.back
                    ? <Redirect to="/time"/>
                    : null}
                {this.state.restart
                    ? <Redirect to="/email"/>
                    : null}
                <p>{Session.getPayload().username}</p>
                <p>{Session.getPayload().name}</p>
                <p>{Session.getPayload().day}</p>
                <p>{Session.getPayload().time}</p>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button onClick={this.handleBack} type="button" className="btn btn-secondary">Back</button>
                    <button onClick={this.handleRestart} type="button" className="btn btn-danger">Restart</button>
                    <button type="submit" className="btn btn-primary">Confirm</button>
                </div>
            </form>
        )
    }
};

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.active = "list-group-item list-group-item-action active";
        this.inactive = "list-group-item list-group-item-action";
    }
    render() {
        return (
            <div
                className={this.props.active
                ? this.active
                : this.inactive}
                data-toggle="list"
                role="tab"
                onClick={(e) => this.props.handleClick(e, this.props.item, this.props.index)}>{this.props.item}
            </div>
        )
    }
}

export default App;
