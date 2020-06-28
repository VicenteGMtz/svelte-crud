<script>
  import { db } from "./firebase";
  import toaster from "toastr";
  let date;
  let task = {
    name: "",
    description: "",
  };

  let tasks = [];
  let editSatus = false;
  let currentId;
  db.collection("task").onSnapshot((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    tasks = [...docs];
  });

  const addTask = async () => {
    await db
      .collection("task")
      .doc()
      .set({ ...task, createdAt: Date.now() });
    toaster.success("Task added succesfully", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
  };

  const updateTask = async () => {
    await db.collection("task").doc(currentId).update(task);
    toaster.success("Task updated succesfully", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });
    editSatus = false;
  };

  const handleSumit = () => {
    if (!editSatus) {
      addTask();
    } else {
      updateTask();
    }

    task = {
      name: "",
      description: "",
    };
  };

  const deleteTak = async (id) => {
    await db.collection("task").doc(id).delete();
    console.log(id);
    toaster.success(" Task deleted succesfully", {
      timeOut: 1000,
      progressBar: true,
      positionClass: "toast-bottom-right",
    });

    editSatus = false;
  };

  const editTask = (currentTask) => {
    editSatus = true;
    currentId = currentTask.id;
    task.name = currentTask.name;
    task.description = currentTask.description;
    console.log(currentTask);
  };
  const onCancel = () => {
    editSatus = false;
    task = {
      name: "",
      description: "",
    };
  };
</script>

<style>

</style>

<div class="container p-4">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <form on:submit|preventDefault={handleSumit} class="card card-body">
        <div class="form-group">
          <input
            bind:value={task.name}
            type="text"
            placeholder="Write a new task"
            class="form-control" />
        </div>
        <div class="form-group">
          <textarea
            bind:value={task.description}
            rows="3"
            placeholder="Write task description"
            class="form-control" />
        </div>

        <button class="btn btn-primary">
          {#if !editSatus}Save{:else}Update{/if}
        </button>
        {#if editSatus}
          <button class="btn btn-info" on:click={onCancel}>Cancel</button>
        {/if}
      </form>

      {#each tasks as task}
        <div class="card card-body mt-3">
          <div class="d-flex justify-content-between">
            <h5>{task.name}</h5>
            <i
              class="material-icons"
              style="vertical-align:middle"
              on:click={editTask(task)}>
              edit
            </i>
          </div>

          <p>{task.description}</p>
          <button class="btn btn-danger" on:click={deleteTak(task.id)}>
            <i class="material-icons" style="vertical-align:middle">
              delete_forever
            </i>
          </button>

        </div>
      {/each}
    </div>
  </div>

</div>
