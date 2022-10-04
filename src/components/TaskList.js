import React from 'react';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { taskListID: 0, text: '', addVisible: false }
        this.newTaskSubmit = this.newTaskSubmit.bind(this);
        this.updateText = this.updateText.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.hideAddForm = this.hideAddForm.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(e) {
        console.log("HOVER");
    }

    showAddForm(e) {
        this.setState({ addVisible: true });
        //document.getElementById("addtask").focus();
    }

    hideAddForm(e) {
        this.setState({ addVisible: false });
    }

    newTaskSubmit(e) {
        e.preventDefault();
        this.props.addNewTask({ title: this.state.text,     content: "A Description about tea...", taskColumnID: this.props.taskColumnID });
        this.setState({ text: '' });
    }

    updateText(e) {
        this.setState({ text: e.target.value });
    }

    componentDidUpdate(prevprops) {
        if(!prevprops.addVisible && this.state.addVisible)
        {
            document.getElementById("addtask" + this.props.taskColumnID).focus();
        }
    }

    render() {
        return (
            <div className='col-sm-3 tasklist-col'>
                <div className='tasklist' style={{boxShadow: "4px 3px" + this.props.column.color }}>
                    <h2>{ this.props.name }</h2>
                    <div className='row gy-2 d-flex justify-content-center tasklist-items-list'>
                        {
                            this.props.tasks.map(task => (
                                <div className='col-sm-12' onMouseOver={this.handleHover}>
                                    <div className='tasklist-item'>
                                        <h6>{ task.title }</h6>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <div className='show-add-form-button' onClick={ this.showAddForm }>
                            +
                        </div>
                        <form className={ this.state.addVisible ? 'addform-shown' : 'addform-hidden' } onSubmit={ this.newTaskSubmit }>
                            <input id={'addtask' + this.props.taskColumnID} placeholder="What needs to be done?" onChange={ this.updateText } value={ this.state.text } onBlur={ this.hideAddForm } />
                            {/* <button>Add Task</button> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;