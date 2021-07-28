import './styles.css';
import { BaseComponent, ComponentWrapper } from './component';
import * as FunctionBased from './context-function-based';
import * as ClassBased from './context-class-based';

export default function App() {
  return (
    <div className='App'>
      <h1>React Context: Class vs. Function</h1>
      <p>Open console to see logged messages</p>
      <div className='Demo'>
        {/* <Demo displayName='ClassBased' context={ClassBased} />
        <Demo displayName='FunctionBased' context={FunctionBased} /> */}
        <Demo
          displayName='DeeplyNestedFunctionBased'
          context={FunctionBased}
          deeplyNested={true}
        />
      </div>
    </div>
  );
}

const Demo = ({ context, displayName, deeplyNested = false }) => {
  return (
    <>
      <h2>{displayName} Context Demo</h2>
      <context.Provider>
        {deeplyNested ? (
          <ComponentWrapper>
            <ComponentWrapper>
              <ComponentWrapper>
                <BaseComponent
                  displayName={displayName}
                  context={context.Context}
                />
              </ComponentWrapper>
            </ComponentWrapper>
          </ComponentWrapper>
        ) : (
          <BaseComponent displayName={displayName} context={context.Context} />
        )}
      </context.Provider>
    </>
  );
};
