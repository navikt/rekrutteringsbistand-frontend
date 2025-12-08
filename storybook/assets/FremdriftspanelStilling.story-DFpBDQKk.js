import{ax as I,U as w,j as t,y as k,S as x,cz as j,cH as b,cG as g,cA as u,Y as y,c$ as _}from"./iframe-lHk_a_Ys.js";import{w as m,c as D}from"./ContextDecorators-CfdMzPsM.js";import{F as N,A as v}from"./FullførtStilling-B3wYykFS.js";import{R as T}from"./GjenåpneStillingKnapp-3g7ft2oH.js";import{T as A}from"./TilgangskontrollForInnhold-ChszikYn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CKwNZ6xA.js";import"./OrganisasjonsnummerAlert-pIiwz4o2.js";import"./VStack-BgragJN7.js";import"./BasePrimitive-mL93Sz-M.js";import"./List-C62mOMDS.js";import"./Link-BK3qalDl.js";import"./KandidatHendelseTag-CE0DX2vf.js";import"./Tag-DOherZZD.js";import"./ChatExclamationmark-DxrFlG-C.js";import"./FileXMark-C7kv2qyg.js";import"./Trash-C29_Zhjq.js";import"./HandShakeHeart-D7XyvQyj.js";import"./Calendar-t7TVRuHz.js";import"./ThumbUp-Bq1lpbw4.js";import"./Table-B9HTLA43.js";import"./index-BfhVw7sA.js";import"./index-B40KJ5b4.js";import"./util-CgO9toBk.js";import"./DatoVelger-7rjfhDKz.js";import"./useDatepicker-DWNy2X_R.js";import"./useControllableState-BAfukxCW.js";import"./Modal-DNDm5JxN.js";import"./floating-ui.react-DP9N4sQ7.js";import"./Date.Input-CwQCqCkJ.js";import"./useFormField-AG7POx7Y.js";import"./ChevronDown-B6zAlv3g.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-q86mg6HT.js";import"./Modal.context-YOjTMdCO.js";import"./Popover-CIgj0Z8V.js";import"./DismissableLayer-B2w8ZaY2.js";import"./startOfMonth-CkHSxqn5.js";import"./Select-Ce9decnB.js";import"./endOfMonth-DvWF4wUZ.js";import"./ArrowLeft-CV2SOy7-.js";import"./ArrowRight-CPfiL38V.js";import"./isSameDay-CjWdGbIz.js";import"./Checkbox-CgRxrjCP.js";import"./Fieldset-yi9QFVOb.js";import"./accordion-DimBYVw9.js";import"./index-DHIYYeVM.js";import"./index-DF6HdW_w.js";import"./index-DjCqZrbR.js";import"./Box-ml8chhWk.js";import"./Bell-Bj17M3Iq.js";import"./PersonChat-OfaFROYx.js";import"./Eye-FQLZAJCp.js";import"./ProgressBar-Bj0HNU85.js";import"./useLatestRef-DDQLWIW7.js";import"./EyeSlash-CkpIG80o.js";import"./CircleSlash-CB0YpCt_.js";import"./Pencil-KLFO0XML.js";import"./FullførStillingModal-CcwUPJJT.js";import"./PersonbrukerTekst-BqjGLYrJ.js";import"./ClockDashed-CDUG7a__.js";import"./IkonNavnAvatar-BWRQMqKF.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-CfqFaVzO.js";import"./ErrorBoundary-7qVjngLq.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
