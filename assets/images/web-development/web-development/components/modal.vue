<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <button class="modal-default-button close" @click="$emit('close')">
                      X 
                    </button>
                    <slot name="header">
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>


<script>


export default ({
    data() {
      return{
       
        
      }  
    },

 
})
</script>


<style >
.close {
    border: none;
    font-size: 20px;
    margin-left: 100px;
    cursor: pointer;
    font-weight: bold;
    background: transparent;    
  }
.modal-mask {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: table;
  transition: opacity 0.2s ease;
  
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  
}

.modal-container {
  width: 40%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  height: auto;
  padding: 30px 40px 30px 40px;
}

.modal-header {
    font-size: 30px;
    color: #202020;
    font-weight: bolder;
}

.modal-body h3{
  margin: 20px 0;
  font-size: 16px;
  display: inline;
}

.modal-default-button {
  float: right;
  background: transparent;
  padding-right: 12px;
  display: inline;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-body{
    overflow: hidden;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}



</style>
