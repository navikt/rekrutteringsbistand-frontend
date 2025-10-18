import{ak as I,al as w,j as t,R as k,S as j,ci as x,ck as b,cm as g,cz as u,aK as y,cA as _}from"./iframe-Ck33ggOC.js";import{w as m,c as D}from"./ContextDecorators-CZkd3Y3H.js";import{F as N,A as v}from"./FullførtStilling-BcXROX6y.js";import{R as T}from"./GjenåpneStillingKnapp-CqmWc6Oa.js";import{T as A}from"./TilgangskontrollForInnhold-qmcA7MfN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bc6BpKxw.js";import"./OrganisasjonsnummerAlert-Bz9aYUJx.js";import"./VStack-CwAdOiJC.js";import"./BasePrimitive-2YXnS0Vq.js";import"./List-CiVDev-F.js";import"./Link-Dhxk3pZY.js";import"./KandidatHendelseTag-Dutu81Gf.js";import"./Tag-CsNFT0pA.js";import"./FileXMark-Dep70K3x.js";import"./Trash-DDSdI9vd.js";import"./HandShakeHeart-DL1szVzF.js";import"./Calendar-kG32Vn-7.js";import"./ThumbUp-sZeUVaqB.js";import"./Table-D378Q1o2.js";import"./util-AkxYbrQx.js";import"./format-UiBtHa0D.js";import"./match-Cd8cmJ-v.js";import"./parse-Diyaa5jl.js";import"./getDefaultOptions-Din5M8Fd.js";import"./parseISO-Dq09H4BU.js";import"./util-DTcs0ln3.js";import"./accordion-CqxyFYNn.js";import"./index-By7DDgau.js";import"./index-DF1Ilwfa.js";import"./index-CoVbNhX5.js";import"./ChevronDown-BXAsIZJi.js";import"./Box-BIT0Fl97.js";import"./Bell-ChLsRh_K.js";import"./PersonChat-BGllu84Q.js";import"./Eye-CQK-LiiH.js";import"./ProgressBar-BLWZ2SAf.js";import"./EyeSlash-CbcJYGN4.js";import"./CircleSlash-24Ve2BhK.js";import"./Modal-BcQsDA8r.js";import"./floating-ui.react-BjZSQk9a.js";import"./Date.Input-XIuiiXeM.js";import"./useFormField-DKMLnyQg.js";import"./useControllableState-bKlpX_Tg.js";import"./Modal.context-DFsOWbmP.js";import"./Checkbox-B3MpiBlT.js";import"./Fieldset-BYdyE_TT.js";import"./Pencil-Ceu7g7ew.js";import"./PersonbrukerTekst-I9FEyh4U.js";import"./ClockDashed-DTwl7rgI.js";import"./Tasklist-BZlNwjB_.js";import"./ErrorBoundary-Bi4rqHuq.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
