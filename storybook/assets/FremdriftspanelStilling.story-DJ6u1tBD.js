import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-rcQ536TZ.js";import{w as m,c as E}from"./ContextDecorators-pwe5tr0a.js";import{F as N,A as v}from"./FullførtStilling-BEiNrTYR.js";import{R as T}from"./GjenåpneStillingKnapp-CikAW9Na.js";import{T as D}from"./TilgangskontrollForInnhold-CN7Y8uLi.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqhfWW1z.js";import"./OrganisasjonsnummerAlert-DIxPEGEB.js";import"./VStack-Bd5XxMuD.js";import"./BasePrimitive-DOQGXNDv.js";import"./List-Bge0zYza.js";import"./Link-Dl-V4cSV.js";import"./KandidatHendelseTag-PbGGHMS7.js";import"./Tag-xAKM8J8p.js";import"./ChatExclamationmark-DkFY89ke.js";import"./FileXMark-z-oFo2nP.js";import"./Trash-Cwb_7YZ0.js";import"./HandShakeHeart-D6kFY2Lw.js";import"./Calendar-CwMFbYJ1.js";import"./ThumbUp-DFrEW2Ez.js";import"./Table-DapziAdA.js";import"./util-BO75DCsf.js";import"./parse-B3-puTFr.js";import"./getDefaultOptions-BKcChqVo.js";import"./parseISO-C32pz730.js";import"./index-B3GzxfYD.js";import"./index-B40KJ5b4.js";import"./isBefore-D4c0a3-L.js";import"./util-CCDa60yO.js";import"./accordion-BTiR3W6U.js";import"./index-CqC4X6oL.js";import"./index-C-mD6KQC.js";import"./index-bZ3tINkF.js";import"./ChevronDown-CONpnMjq.js";import"./Box-CUMVVx6K.js";import"./Bell-D2J17BfO.js";import"./PersonChat-BKFs2BiC.js";import"./Eye-rMPbn51e.js";import"./ProgressBar-BVXmGZla.js";import"./EyeSlash-DL04f_EX.js";import"./CircleSlash-pD_7n3jF.js";import"./Modal-98TWSHc-.js";import"./floating-ui.react-BnE5Js1c.js";import"./Date.Input-CkhCOS9u.js";import"./useFormField-DVG_5Xb7.js";import"./useControllableState-yOoOMJdI.js";import"./Modal.context-ClNL2aFZ.js";import"./Checkbox-uQGlxmUg.js";import"./Fieldset-BiraFbWG.js";import"./Pencil-CJhHjaDe.js";import"./PersonbrukerTekst-CNFa1sLo.js";import"./ClockDashed-C7Kbggej.js";import"./Tasklist-KYJLodxU.js";import"./ErrorBoundary-2ZaQEmg_.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
