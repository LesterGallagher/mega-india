import React, { Component } from 'react';
import { Page, Toolbar, ToolbarButton, Icon, ProgressBar, BackButton } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import styles from './Chat.module.css';
import MessageList from './MessageList/MessageList';
import ChatInput from './ChatInput/ChatInput';
import NotFound from '../NotFound/NotFound';

class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      chatMeta: this.props.chatStore.chatMeta,
      count: 100,
    };

  }

  componentDidMount = () => {
    this.props.chatStore.on('change', this.handleChatStoreChange);
    this.initializeChat(this.props, this.state);
  }

  componentWillUnmount = () => {
    this.props.chatStore.removeListener('change', this.handleChatStoreChange);
  }

  handleChatStoreChange = () => {

  }

  componentWillReceiveProps = (nextProps, nextState) => {
    if (this.props.match.params[0] === nextProps.match.params[0]) return;
    this.initializeChat(nextProps, nextState);
  }

  initializeChat = async (props) => {
    const meta = await this.props.chatStore.getChatMetaItem(props.match.params[0]);
    this.setState({
      messagesLoaded: false,
      slug: props.match.params[0],
      meta: meta
    }, async () => {
      if (this.state.meta) {
        props.chatStore.getChatThread(this.state.meta)
          .then(this.handleChatThread);
      }
    });
  }

  handleChatThread = thread => {
    if (thread === this.state.thread) return;
    this.setState({
      thread: thread
    });
  }

  renderToolbar = () => {
    return (<Toolbar>
      <div className="left">
        <BackButton onClick={this.props.history.goBack}></BackButton>
      </div>
      <div className="center">
        {this.state.meta ? this.state.meta.title : 'Not Found'} Chat
      </div>
      <div className="right">
      </div>
    </Toolbar>);
  }

  handleMessagesLoaded = () => {
    if (this.messagesLoaded) return;
    this.setState({
      messagesLoaded: true
    });
  }

  render() {
    if (this.state.meta === undefined) return (
      <Page renderToolbar={this.renderToolbar}>
        <NotFound />;
      </Page>);

    return (
      <Page renderToolbar={this.renderToolbar}>
        <div className={styles.root}>
          <ProgressBar style={{ opacity: this.state.messagesLoaded ? 0 : 1 }} indeterminate />
          {this.state.thread ? <MessageList
            chatStore={this.props.chatStore}
            onMessagesLoaded={this.handleMessagesLoaded}
            thread={this.state.thread} /> : null}
          {this.state.thread ? <ChatInput
            chatStore={this.props.chatStore}
            threadObserver={this.state.thread.threadObserver} /> : null}
        </div>
      </Page>
    );
  }
}

export default withRouter(Chat);
