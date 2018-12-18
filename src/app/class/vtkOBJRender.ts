import vtkRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow';
// import vtkRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkOBJReader from 'vtk.js/Sources/IO/Misc/OBJReader';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor'
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import apiConfig from '../config/api-config';



/**
 * 使用vtk渲染obj格式的模型
 * @param dom 要显示模型的dom元素
 * @param url 模型的地址数组
 */
function vtkRenderOBJ(dom: Element, url: string[], callback) {
    let newUrls = [];
    url.map((v) => { newUrls.push(`${apiConfig.assets}${v}`)})   
    const screenRenderer = vtkRenderWindow.newInstance({ background: [0, 0, 0] });
    const renderer = screenRenderer.getRenderer();
    const reader = vtkOBJReader.newInstance();
    const renderWindow = screenRenderer.getRenderWindow();
    global["render"] = renderWindow;
    global["screeRender"] = screenRenderer;
    let actors = [];
    ///初始化场景   
    screenRenderer.setContainer(dom);
    newUrls.forEach(url => {
        reader.setUrl(url)
            .then(() => {
                callback();
                const size = reader.getNumberOfOutputPorts();  
                for (let i = 0; i < size; i++) {
                    const polyData = reader.getOutputData(i);
                    const mapper = vtkMapper.newInstance();
                    const actor = vtkActor.newInstance();
                    actor.setMapper(mapper);
                    mapper.setInputData(polyData);
                    renderer.addActor(actor);
                    actors.push(actor);
                }
                renderer.resetCamera();
                renderWindow.render();
                screenRenderer.resize();

            })
    });
    global["actors"]=actors;
}
export default vtkRenderOBJ;