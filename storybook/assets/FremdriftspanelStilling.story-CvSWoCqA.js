import{ac as I,ad as w,j as t,R as k,S as j,ch as x,cl as b,aG as g,ci as u,aP as y,cy as _}from"./iframe-Bs62DkEX.js";import{w as d,c as D}from"./ContextDecorators-2ziKhUW6.js";import{F as N,A as v}from"./FullførtStilling-C6vYeuM0.js";import{R as T}from"./GjenåpneStillingKnapp-DlnMy62g.js";import{T as A}from"./TilgangskontrollForInnhold-BCMQlDtq.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CmU3_d-G.js";import"./OrganisasjonsnummerAlert-BB6dOjTW.js";import"./VStack-DErorjmi.js";import"./BasePrimitive-hqgAfBeE.js";import"./List-D4X4XiY5.js";import"./Link-C-FD5pVt.js";import"./KandidatHendelseTag-DASbdwf-.js";import"./Tag-aBUAMrEB.js";import"./ChatExclamationmark-BjS5JwFD.js";import"./FileXMark-B1A4YTzE.js";import"./Trash-BE175DFP.js";import"./HandShakeHeart-By1TwYOi.js";import"./Calendar-B-bTdlPX.js";import"./ThumbUp-CraOnywH.js";import"./Table-MswEoFGk.js";import"./util-DFhn6qLM.js";import"./format-Ca2I7mTu.js";import"./match-DGpmc3fc.js";import"./parseISO-D4cIKA-0.js";import"./parse-BnkTT2en.js";import"./getDefaultOptions-CLP4Qnh0.js";import"./util-DmMa8XpB.js";import"./accordion-CYk4Ayv9.js";import"./index-BFm6kSOX.js";import"./index-DaWRuG6u.js";import"./index-KI6eyebS.js";import"./ChevronDown-DToF2878.js";import"./Box-Hqc-wonw.js";import"./Bell-D8YXwO9d.js";import"./PersonChat-CrbcnA0-.js";import"./Eye-DH8NwLAm.js";import"./ProgressBar-D1c7T4x2.js";import"./EyeSlash-uXSRS44L.js";import"./CircleSlash-DoRtUzFt.js";import"./Modal-D_wK6Ohn.js";import"./floating-ui.react-BzSxB3LF.js";import"./Date.Input-DZNBgtRi.js";import"./useFormField-DiCDh7BC.js";import"./useControllableState-CF1ufetu.js";import"./Modal.context-CgSnuUz-.js";import"./Checkbox-CYY4yg-T.js";import"./Fieldset-JiTNZDsA.js";import"./Pencil-BIeT8mFv.js";import"./PersonbrukerTekst-K8G-GLnI.js";import"./ClockDashed-BIaN8BhX.js";import"./Tasklist-B_AVsB6_.js";import"./ErrorBoundary-ZJB2VEfh.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
