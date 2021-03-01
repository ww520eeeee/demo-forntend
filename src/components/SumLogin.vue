<template>
    <div>
        <!-- 卡片区域 -->
<!--        测一测好吧-->
        <el-card>
            <!--   提示区域  -->
            <el-alert
                    title="売上登録"
                    type="info"
                    center
                    show-icon :closable="false">
            </el-alert>

            <!--   步骤条区域  -->
            <el-steps :space="700" :active="activeIndex - 0" finish-status="success" align-center>
                <el-step title="取引先"></el-step>
                <el-step title="案件名"></el-step>
                <el-step title="請求書写真"></el-step>
                <el-step title="売上詳細"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

            <!--   tab栏区域  -->
            <el-form :model="addForm" :rules="addFormRules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm" label-position="top">
                <el-tabs :tab-position="'left'" v-model="activeIndex">
                    <!--          取引先-->
                    <el-tab-pane label="取引先" name="0">
                        <el-form-item label="会社名" prop="cname">
                            <el-input v-model="addForm.cname"></el-input>
                        </el-form-item>
                        <el-form-item label="担当者" prop="ctel">
                            <el-input v-model="addForm.cperson"></el-input>
                        </el-form-item>
                        <el-form-item label="電話番号" prop="ctel">
                            <el-input v-model="addForm.ctel"></el-input>
                        </el-form-item>
                        <el-form-item label="請求日">
                            <el-col :span="5">
                                <el-date-picker type="date" placeholder="請求日" v-model="addForm.cdata" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align:center;">-</el-col>
                            <el-col :span="5">
                                <el-date-picker type="date" placeholder="入金日" v-model="addForm.cmoney" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-tab-pane>
                    <!--          案件名-->
                    <el-tab-pane label="案件名" name="1">
                        <el-form-item label="案件名" prop="pname">
                            <el-input v-model="addForm.pname"></el-input>
                        </el-form-item>
                        <el-form-item label="金額" prop="pmoney">
                            <el-input v-model="addForm.pmoney"></el-input>
                        </el-form-item>
                        <el-form-item label="案件分類" prop="">
                            <el-cascader
                                    v-model="addForm.pcat"
                                    :options="plist"
                                    :props="{ expandTrigger: 'hover' }"
                                    @change="handleChange">

                            </el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <!--          請求書写真-->
                    <el-tab-pane label="請求書写真" name="2">
                        <el-button size="small" type="primary" style="margin-left: 10px;margin-bottom: 10px;">点击上传</el-button>
                        <!--                       action表示图片要上传的API地址-->
                        <el-upload :action="uploadURL" list-type="picture-card" :auto-upload="false"
                                   :on-preview="handlePreview" :on-remove="handleRemove">
                            <i slot="default" class="el-icon-plus"></i>

                        </el-upload>
                        <!--            图片预览-->
                        <el-dialog :visible.sync="dialogVisible" width="50%">
                            <img width="100%" :src="dialogImageUrl" alt="" class="previewImg">
                        </el-dialog>
                    </el-tab-pane>
                    <!--          案件詳細-->
                    <el-tab-pane label="売上詳細" name="3">
                        <!--            富文本编辑器组件-->
                        <quill-editor v-model="addForm.objIntroduce">

                        </quill-editor>
                        <!--            添加的按钮-->
                        <el-button type="primary" style="margin-top: 15px" @click="add">提出</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>

    </div>
</template>
<script>
    import _ from 'lodash'

    export default {
        data() {
            return {
                //设置图片的各种动作
                disabled: true,
                dialogImageUrl: '',
                dialogVisible: false,
                //上传图片的地址
                uploadURL: '#',
                //案件分类列表
                plist: [
                    {
                        value: 'ss',
                        label: 'SS事業部',
                        children: [{
                            value: 'G1チーム',
                            label: 'G1チーム',
                            children: [{
                                value: '開発',
                                label: '開発'
                            }, {
                                value: '保守',
                                label: '保守'
                            }]
                        }, {
                            value: 'G2チーム',
                            label: 'G2チーム',
                            children: [{
                                value: '開発',
                                label: '開発'
                            }, {
                                value: '保守',
                                label: '保守'
                            },
                                {
                                    value: '設計',
                                    label: '設計'
                                }]
                        },
                            {
                                value: 'デザインチーム',
                                label: 'デザインチーム',
                                children: [{
                                    value: '開発',
                                    label: '開発'
                                }, {
                                    value: '保守',
                                    label: '保守'
                                },
                                    {
                                        value: '設計',
                                        label: '設計'
                                    }, {
                                        value: 'テスト',
                                        label: 'テスト'
                                    },
                                ]
                            }]
                    },
                    {
                        value: 'ss',
                        label: 'SI事業部',
                        children: [{
                            value: 'G1チーム',
                            label: 'G1チーム',
                            children: [{
                                value: '開発',
                                label: '開発'
                            }, {
                                value: '保守',
                                label: '保守'
                            }]
                        }, {
                            value: 'G2チーム',
                            label: 'G2チーム',
                            children: [{
                                value: '開発',
                                label: '開発'
                            }, {
                                value: '保守',
                                label: '保守'
                            },
                                {
                                    value: '設計',
                                    label: '設計'
                                }]
                        },
                            {
                                value: 'G3チーム',
                                label: 'G3チーム',
                                children: [{
                                    value: '開発',
                                    label: '開発'
                                }, {
                                    value: '保守',
                                    label: '保守'
                                },
                                    {
                                        value: '設計',
                                        label: '設計'
                                    }, {
                                        value: 'テスト',
                                        label: 'テスト'
                                    },
                                ]
                            }, {
                                value: 'G4チーム',
                                label: 'G4チーム',
                                children: [{
                                    value: '開発',
                                    label: '開発'
                                }, {
                                    value: '保守',
                                    label: '保守'
                                },
                                    {
                                        value: '設計',
                                        label: '設計'
                                    }, {
                                        value: 'テスト',
                                        label: 'テスト'
                                    },
                                ]
                            }, {
                                value: 'G5チーム',
                                label: 'G5チーム',
                                children: [{
                                    value: '開発',
                                    label: '開発'
                                }, {
                                    value: '保守',
                                    label: '保守'
                                },
                                    {
                                        value: '設計',
                                        label: '設計'
                                    }, {
                                        value: 'テスト',
                                        label: 'テスト'
                                    },
                                ]
                            }]
                    },
                ],

                activeIndex: '0',

                //売上登录表单对象
                addForm: {
                    cname: '',
                    cperson: '',
                    ctel: '',
                    cdata: '',
                    cmoney: '',
                    pname: '',
                    pmoney: '',
                    pcat: [],
                    //案件的详细描述
                    objIntroduce: '',
                },
                //表单规则
                addFormRules: {
                    cname: [
                        {required: true, message: '会社名は必須', trigger: 'blur'},//必填项验证
                        // { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }//长度验证
                    ],
                    pname: [
                        {required: true, message: '案件名は必須', trigger: 'blur'},//必填项验证
                        // { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }//长度验证
                    ],
                    pmoney: [
                        {required: true, message: '金額は必須', trigger: 'blur'},//必填项验证
                        // { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }//长度验证
                    ]
                },

                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择活动区域', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //级联选择器的方法
            handleChange() {
                console.log(this.addForm.pcat)
            },
            //处理图片预览效果
            handlePreview(file){
                console.log(file)
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //处理移除文件的操作
            handleRemove(file){
                this.$message({
                    type: 'info',
                    message: '已删除原有图片',
                    duration: 1000
                });
            },

            //提交売上信息
            add() {
                this.$refs.ruleForm.validate
                (valid => {
                    //先判断是否符合
                    if (!valid){
                        return this.$message.error("请填写必要的表单项")
                    }
                    //执行提交的逻辑处理
                    //深拷贝
                    const form = _.cloneDeep(this.addForm)
                    form.pcat = form.pcat.join(',')
                    console.log(this.addForm)
                    console.log(form.pcat)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .previewImg{
        width: 100%;
    }
</style>

