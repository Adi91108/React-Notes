import { useEffect, useState } from "react";
import "./styles.css";
import { MdAddTask } from "react-icons/md";
import Note from "../Notes/Notes";
import Navbar from "../NavBar/Navbar";

const Input = () => {
  const [notes, setNotes] = useState(() => {
    try {
      const localValue = localStorage.getItem("notes");
      return localValue ? JSON.parse(localValue) : [];
    } catch (error) {
      console.error("Error parsing JSON from local storage:", error);
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Error stringifying notes to JSON:", error);
    }
  }, [notes]);

  const handleClickButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title: title,
        content: content,
        completed: false,
        id: Date.now(),
      },
    ]);
    setTitle("");
    setContent("");
  };

  const handleUpdateText = (id, valueTitle, valueBody) => {
    const updatedList = notes.map((e) => {
      if (e.id === id) {
        e.title = valueTitle;
        e.content = valueBody;
      }
      return e;
    });
    setNotes(updatedList);
  };

  const handleDelete = (id) => {
    let deleteConfirm = `Do you want to delete note ${id}`;
    if (confirm(deleteConfirm) === true) {
      const deletedNotes = notes.filter((note) => note.id !== id);
      setNotes(deletedNotes);
    } else {
      return;
    }
  };

  ////// extra Feature Added

  const handleSearch = () => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  ////////////////////////

  return (
    <>
      <Navbar
        handleSearch={(value) => setSearchTerm(value)}
        searchTerm={searchTerm}
      />
      <div>
        <form>
          {
            <input
              value={title}
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          }
          <p>
            <textarea
              value={content}
              name="content"
              placeholder="Take a note..."
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </p>
          <button onClick={handleClickButton}>
            <MdAddTask size={35} />
          </button>
        </form>
      </div>

      {/* / New update feature list / */}

      <>
      {notes.length > 0 ? (
          <>
            {searchTerm
              ? handleSearch().map((note) => (
                  <Note
                    {...note}
                    key={note.id}
                    handleDelete={handleDelete}
                    handleUpdateText={handleUpdateText}
                  />
                ))
              : notes
                  .map((note) => (
                    <Note
                      {...note}
                      key={note.id}
                      handleDelete={handleDelete}
                      handleUpdateText={handleUpdateText}
                    />
                  ))
                  .reverse()}
          </>
        ) : (
          <p style={{ textAlign: "center" }}>Nothing to Keep</p>
        )}
    
      </>
    </>
  );
};

export default Input;
