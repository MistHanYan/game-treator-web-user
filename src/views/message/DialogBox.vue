<template>
  <template>
    <div class="vgpt__editor">
      <div class="vgpt__editor-inner flexbox">
        <Input
          class="flex1"
          ref="editorRef"
          v-model="editorText"
          type="textarea"
          :autosize="{ maxRows: 6 }"
          clearable
          placeholder="Prompt..."
          @keydown="handleKeydown"
          @clear="handleClear"
          style="margin: 0 5px"
        >
          <template #suffix>
            <Button class="btn" type="link" @click.stop>
              <Icon name="ve-icon-image" size="16" cursor />
              <input
                ref="uploadImgRef"
                type="file"
                title=""
                accept="image/*"
                @change="handleUploadImage"
              />
            </Button>
            <van-popover v-model:show="showPopover" placement="top">
              <template #reference>
                <Button class="btn" type="link" icon="ve-icon-audio"></Button>
              </template>
              <div class="flexbox flex-alignc flex-col" style="padding: 15px 0; min-width: 120px">
                <Icon name="ve-icon-yuyin" size="40" color="#0fa27e" />
                <p class="fs-12 mb-15 c-999">网络不给力</p>
                <van-button size="mini"><i></i>开始讲话</van-button>
              </div>
            </van-popover>
          </template>
        </Input>
        <Button
          type="primary"
          icon="ve-icon-arrowup"
          circle
          :disabled="!editorText"
          @click="handleSubmit"
        ></Button>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts" name="Message"></script>
