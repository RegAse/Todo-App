import React from 'react';
import TaskList from './components/TaskList';

class TaskApp extends React.Component {
    constructor(props) {
        super(props);

        // Data....
        this.state = { tasks: [
            { title: "Make Tea",     content: "A Description about tea...", taskColumnID: 0 },
            { title: "Make More Tea",content: "A Description about tea...", taskColumnID: 0 },
            { title: "Make Even More Tea",     content: "A Description about tea...", taskColumnID: 0 },
            { title: "Bake Waffles", content: "Bake Waffles Ye!",           taskColumnID: 1 }
        ],
        taskColumns: [
            { ID: 0, title: "Todo", color: "#7d4545"},
            { ID: 1, title: "In Progress", color: "#7d6c45"},
            { ID: 2, title: "Done", color: "#567d45"},
        ],
        currentTheme: 0,
        themes: [
            { ID: 0, title: "Dark", previewImage:"/images/theme-0.png", backgroundColor: "#1e2129", tasklistBackground: "#293642", taskBackgroundColor: "#222F3B" },
            { ID: 1, title: "Blue", previewImage:"/images/theme-1.png", backgroundColor: "rgb(25, 38, 49)", tasklistBackground: "rgb(28, 51, 70)", taskBackgroundColor: "rgb(40, 67, 89)" },
            { ID: 2, title: "Light",previewImage:"/images/theme-2.png", backgroundColor: "#c1c1c1", tasklistBackground: "rgb(54, 71, 104)", taskBackgroundColor: "rgb(43, 57, 83)" },
        ]
        };

        this.addNewTask = this.addNewTask.bind(this);
    }

    componentDidMount() {
        this.setTheme(this.state.currentTheme);
    }

    componentDidUpdate() {
        this.setTheme(this.state.currentTheme);
    }

    setTheme(id) {
        this.state.currentTheme = id;

        document.body.style.backgroundColor = this.state.themes[this.state.currentTheme].backgroundColor;
        
        let tasklists = document.getElementsByClassName("tasklist");
        for (let i = 0; i < tasklists.length; i++) {
            const element = tasklists[i];
            element.style.backgroundColor = this.state.themes[this.state.currentTheme].tasklistBackground;
        }

        let tasks = document.getElementsByClassName("tasklist-item");
        for (let i = 0; i < tasks.length; i++) {
            const element = tasks[i];
            element.style.backgroundColor = this.state.themes[this.state.currentTheme].taskBackgroundColor;
        }
    }

    addNewTask(task) {
        this.state.tasks.push(task);

        this.setState(state => ({
            tasks: state.tasks
        }));

        this.setTheme(this.state.currentTheme);
    }

    getTaskByColumnID(id) {
        return this.state.tasks.filter(function (filt) {
            return filt.taskColumnID == id;
        });
    }

    getColumnByID(id) {
        return this.state.taskColumns.filter(function (filt) {
            return filt.ID == id;
        })[0];
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='row d-flex align-items-center justify-content-center vh-100 gy-2'>
                            <TaskList column={this.getColumnByID(0)} taskColumnID={0} name={"Todo"}        tasks={ this.getTaskByColumnID(0) } addNewTask={this.addNewTask}  />
                            <TaskList column={this.getColumnByID(1)} taskColumnID={1} name={"In Progress"} tasks={ this.getTaskByColumnID(1) } addNewTask={this.addNewTask} />
                            <TaskList column={this.getColumnByID(2)} taskColumnID={2} name={"Done"}        tasks={ this.getTaskByColumnID(2) } addNewTask={this.addNewTask} />
                        </div>
                    </div>
                </div>

                <div className='d-none d-md-block theme-selector'>
                    <div className='row'>
                    {
                        this.state.themes.map(theme => (
                            <div className='col-sm-4' onClick={ () => this.setTheme(theme.ID) }>
                                <div className='theme-item'>
                                    <img className='img-fluid' src={theme.previewImage} />
                                    { theme.title }
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskApp;