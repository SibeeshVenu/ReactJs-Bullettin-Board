import React, { Component } from 'react'
import Note from './note'
import { FaPlus } from 'react-icons/fa'

class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: []
        }
        this.eachNote = this.eachNote.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
        this.add = this.add.bind(this)
        this.nextId = this.nextId.bind(this)
    }

    componentWillMount(){
        var self = this
        if(this.props.count){
            fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
            .then(response => response.json())
            .then(json=> json[0]
                .split('. ')
                .forEach(sentence=> self.add(sentence.substring(0,25))))
        }
    }

    eachNote(note, i) {
        return (
            <Note key={note.id} index={note.id} onChange={this.update} onRemove={this.remove}>{note.note}</Note>
        )
    }
    add(text){
        this.setState(prevState => ({
            notes:[
                ...prevState.notes,
                {
                    id: this.nextId(),
                    note: text
                }
            ]
        }))
    }
    nextId(){
       this.uniqueId = this.uniqueId || 0
       return this.uniqueId++
    }
    update(newText, i) {
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : { ...note, note: newText }
            )
        }))
    }
    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }
    render() {
        return (
            <div className="board">
                {
                    this.state.notes.map(this.eachNote)
                }
                <button id="add" onClick={this.add.bind(null, "New note")}><FaPlus /></button>
            </div>
        )
    }
}
export default Board