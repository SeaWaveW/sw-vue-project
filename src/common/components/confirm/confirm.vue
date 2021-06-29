<template>
<div class="sw-messageBox" v-show="show">
    <div v-if="shade" class="sw-messageBox__model" :style="{backgroundColor:shadeBg,zIndex}" @click="closeOnClickModal ? close() : ''"/>
    <div class="sw-messageBox__centent" :class="[ 'sw-mb_c-' + type ]" :style="{zIndex:zIndex+1}">
        <div class="sw-messageBox__header flex">
            <span v-if="!$scopedSlots.header">
                {{title}}
            </span>
            <span v-else>
                <slot name="header"></slot>
            </span>
            <i class="iconfont icon-close sw-messageBox__close" @click="close" v-if="showClose"/>
        </div>
        <div class="sw-messageBox__body flex">
            <i class="iconfont" :class="[ type === 'default' ? 'icon-wenhao' : 'icon-' + type ]"/>
            <div v-if="dangerouslyUseHTMLString" v-html="message" class="message"/>
            <div v-else class="message">
                {{message}}
            </div>
        </div>
        <div class="sw-messageBox__footer flex">
            <button v-if="showCancelButton" :class="cancelButtonClass" @click="close">{{cancelButtonText}}</button>
            <button v-if="showConfirmButton" :class="confirmButtonClass" @click="confirm">{{confirmButtonText}}</button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'SwMessageBox',
    data(){
        return {
            zIndex:1,
            show:true, //是否打开
            shade:false, //是否需要遮罩层
            shadeBg: 'rgba(0,0,0,0.25)',//遮罩背景
            type:'info', //类型
            title:'标题', //标题
            showClose:true, //是否显示右上角的关闭按钮
            dangerouslyUseHTMLString:false, //是否将message解析成html
            message:'内容', //内容部分
            //取消按钮
            showCancelButton:true,
            cancelButtonClass:'',
            cancelButtonText:'取消',
            //确定按钮
            showConfirmButton:true,
            confirmButtonClass:'',
            confirmButtonText:'确定',
            //遮罩控制
            closeOnClickModal:false, //点击遮罩关闭
            closeOnPressEscape:true,//esc键关闭
            //回调
            promise:'',
            resolve:'',
            reject:'',
        }
    },
    methods:{
        close(){
            return new Promise( (res,rej) => {
                rej(false)
                this.show = false
            } )
        },
        confirm(){
            return new Promise( (res,rej) => {
                res(true)
                this.show = false
            } )
        },
    },
}
</script>

<style scoped lang="scss">

.sw-messageBox,.sw-messageBox__model,.sw-messageBox__centent,.sw-messageBox__header,.sw-messageBox__body,.sw-messageBox__footer{
    box-sizing: border-box;
    font-family: Microsoft Yahei;
}
.sw-messageBox{
    text-align: center;
    .sw-messageBox__model{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .sw-messageBox__centent{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        min-width: 400px;
        max-width: 400px;
        background: white;
        border-radius: 6px;
        overflow: hidden;
        // box-shadow: 0px 1px 1px 2px rgba(255, 255, 255, 0.05);
        @include prefix(box-shadow,0px 1px 1px 2px rgba(255, 255, 255, 0.05));
        .sw-messageBox__header,.sw-messageBox__body,.sw-messageBox__footer{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .sw-messageBox__header{
            position: relative;
            min-height: 32px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 0.5px;
            padding: 8px 25px;
            .sw-messageBox__close{
                position: absolute;
                font-size: 16px;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
            }
        }
        .sw-messageBox__body{
            padding: 15px 25px;
            min-height: 100px;
            .iconfont{
                margin-left: 10px;
                font-size: 50px;
            }
            .message{
                text-align: left;
                width: calc(100% - 60px);
                display: inline-block;
                padding-left: 1em;
                font-size: 14px;
            }
        }
        .sw-messageBox__footer{
            padding: 10px 25px;
            button{
                margin: 0 0.8em;
                min-width: 60px;
                cursor: pointer;
            }
        }
        &.sw-mb_c-default{
            .sw-messageBox__header{
                background-color:$default;
            }
            .sw-messageBox__body{
                .iconfont{
                    color:$default;
                }
            }
        }
        &.sw-mb_c-success{
            .sw-messageBox__header{
                background-color:$success;
            }
            .sw-messageBox__body{
                .iconfont{
                    color:$success;
                }
            }
        }
        &.sw-mb_c-error{
            .sw-messageBox__header{
                background-color:$error;
            }
            .sw-messageBox__body{
                .iconfont{
                    color:$error;
                }
            }
        }
        &.sw-mb_c-warning{
            .sw-messageBox__header{
                background-color:$warning;
            }
            .sw-messageBox__body{
                .iconfont{
                    color:$warning;
                }
            }
        }
        &.sw-mb_c-info{
            .sw-messageBox__header{
                background-color:$info;
            }
            .sw-messageBox__body{
                .iconfont{
                    color:$info;
                }
            }
        }
    }
}
</style>