import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-CjKR20BC.js";import{w as m,c as D}from"./ContextDecorators-C4j0gZQD.js";import{F as N,A as v}from"./FullførtStilling-BZUt93Bm.js";import{R as T}from"./GjenåpneStillingKnapp-DP03IyvR.js";import{T as A}from"./TilgangskontrollForInnhold-zRbWMgjP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-OpMdsle5.js";import"./OrganisasjonsnummerAlert-sFY24i-k.js";import"./VStack-BsXqGekW.js";import"./BasePrimitive-CaBgxhbE.js";import"./List-BTmbOlVO.js";import"./Link-Bo6mtrNI.js";import"./KandidatHendelseTag-DfF6i5Jw.js";import"./Tag-wvT3nD46.js";import"./ChatExclamationmark-mD1OYTO5.js";import"./FileXMark-QgeazkCH.js";import"./Trash-D7LhkQ4B.js";import"./HandShakeHeart-C7oIGzp0.js";import"./Calendar-w3e5z85I.js";import"./ThumbUp-DN2dUS2g.js";import"./Table-CRzPg50P.js";import"./util-DJhqGnO3.js";import"./format-CSKBpAGE.js";import"./match-Cl20IGZX.js";import"./parse-DJYX9sRd.js";import"./getDefaultOptions-ZyZ1VfiA.js";import"./parseISO-CNiVbHcC.js";import"./index-CEKpCU6D.js";import"./index-B40KJ5b4.js";import"./isBefore-C5zPZljL.js";import"./util-CxD7CZfs.js";import"./accordion-CEyj0Dqc.js";import"./index-Cdo7mnN4.js";import"./index-DntDfDF9.js";import"./index-D7QxS4e8.js";import"./ChevronDown-BxxgTCqk.js";import"./Box-DLShXpZA.js";import"./Bell-xMeNfrEl.js";import"./PersonChat-DmdPVRrk.js";import"./Eye-DkoO2nPV.js";import"./ProgressBar-t_-UAeZ8.js";import"./EyeSlash-CRte0ZM7.js";import"./CircleSlash-co31CbGN.js";import"./Modal-B2EuYQ4J.js";import"./floating-ui.react-CQJkre1v.js";import"./Date.Input-BNLwAM5u.js";import"./useFormField-CLSriUsV.js";import"./useControllableState-CjVFov-N.js";import"./Modal.context-Bj39DRJf.js";import"./Checkbox-DdrGsubt.js";import"./Fieldset-BPWrgwgv.js";import"./Pencil-CMXd_VlQ.js";import"./PersonbrukerTekst-CxXrmUjW.js";import"./ClockDashed-CySjlshB.js";import"./Tasklist-ChCJK3la.js";import"./ErrorBoundary-CKihj-bc.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
