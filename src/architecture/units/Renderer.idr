module Renderer
-- trying to improve the return type of `render` in an Elm Style architecture

record Component model action element where
  constructor MkComponent
  init   : model
  update : action -> model -> model
  render : model -> Address action -> element

-- Existing
render : model Address action -> element
-- What I'm looking for
render : model -> element :*: Future action

-- With callbacks
render : model -> (action -> m ()) -> m element

-- what I'm thinking -- maybe it forms some sort of effectful category in the
-- real world mapping elements to actions
render : model -> c element action
render : model -> (element ~> action)

-- or maybe mapping models to actions, in the process using an element
render : (c element) model action

-- elements have associated effect types, e.g. things they can do, like be
-- clicked
Element effect

-- this is just reiterating a specific case of the component pattern with
-- not model
data IElem effect where
  MkElem : (effect -> m ()) -> IElem effect

render : model -> IElem action

data Callback : (Type -> Type) -> Type -> Type where
  MkCallback : (a -> m ()) -> Callback m a

data IElem : (Type -> Type) -> Type -> Type where
  MkElem : (Callback m e -> m Element) -> IElem m e

-- what it would be if we weren't concerned with propagating elements to
-- higher level components
render : model -> IO action

-- the following doesn't work because we need to render elements before they
-- they can send actions
render : model -> Future (element :*: action)

data Cont : Type -> Type -> Type where
  MkCont : ((a -> r) -> r) -> Cont r a

-- Renderer : Type
-- Renderer = ((Effect -> Action) -> Element<Effect>) -> IO Action

-- generalized component function
-- make into a morphism in the kliesli category for m and arrow loop to run
go : (i, model) -> m (o, model)
go : (action, model) -> m (element, model)
go : (action, model) -> Future (element, model)

-- we wouldn't have any problems if it weren't for the fact that actions are
-- heavily linked to the state of the DOM in the form of callbacks
-- if everything was pure with values for mouse position, time, etc. as
-- the only inputs, the world would be a much better place
